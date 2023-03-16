from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime, timezone

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_comment(id):
    """
    Update a comment by comment id
    """
    data = request.get_json()
    comment = Comment.query.get(id)
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not comment:
        return {"errors": ["Comment could not be found"]}, 404
    elif comment.user.id != current_user.id:
        return {"errors": ["User is unauthorized to edit comment"]}, 401

    if form.validate_on_submit():
        comment.comment = data["comment"]
        comment.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        return {"id": comment.expense.id, "comment":comment.to_dict() }, 200

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    pass
