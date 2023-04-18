import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../../../context/Modal'
import { addCommentToExpenseThunk, updateCommentThunk } from '../../../../store/comments';
import "./CommentModals.css"

function PostCommentModal({ expenseId, commentId }) {
    const commentToUpdate = useSelector(state => state.comments[expenseId].find(comment => comment.id === commentId))
    const [comment, setComment] = useState(commentToUpdate ? commentToUpdate.comment : "");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data;

        if (commentToUpdate) {
            commentToUpdate.comment = comment;
            data = await dispatch(updateCommentThunk(commentToUpdate))
        } else {
            data = await dispatch(addCommentToExpenseThunk(expenseId, {comment}))
        }

        if (data) {
            setErrors(data)
          } else {
            closeModal()
          }
    }

    return (
        <form onSubmit={handleSubmit} className="post_comment_form">
            <div className="post_comment_form_title">{!!commentToUpdate ? "Update Comment" : "Leave a Comment"}</div>
            <ul className="post_comment_modal_error_list">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">{!!commentToUpdate ? "Update" : "Post comment"}</button>
        </form>
    )
}

export default PostCommentModal;
