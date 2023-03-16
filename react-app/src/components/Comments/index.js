import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseCommentsThunk } from "../../store/comments";
import { getMMDDYYYY } from "../../utils/utils";
import OpenModalButton from "../OpenModalButton";
import CommentFormModal from "./CommentModalComponents/CommentFormModal";
import DeleteCommentConfirmationModal from "./CommentModalComponents/DeleteCommentConfirmationModal";
import "./Comments.css"


function Comments({ expenseId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments[expenseId])
    // order comments by createdAt date?
    console.log("List of comments for the expense=====================", comments)

    useEffect(() => {
        dispatch(getExpenseCommentsThunk(expenseId));
    }, [dispatch])

    return (
        <>
            <div className="comments_heading">COMMENTS</div>
            {comments && comments.map(comment => {
                const fomattedCreatedAt = getMMDDYYYY(new Date(comment.createdAt))
                const fomattedUpdatedAt = getMMDDYYYY(new Date(comment.updatedAt))

                return (
                    <div key={comment.id} className="comment_div">
                        <div className="comment">{comment.comment}</div>
                        <div className="comment_details_div">
                            <div className="comment_author">{comment.user.firstName} {comment.user.lastName[0]}.</div>
                            <div className="comment_timestamp">Posted On: {fomattedCreatedAt}</div>
                            <div className="comment_timestamp">Last Edited: {fomattedUpdatedAt}</div>
                        </div>
                        {(sessionUser.id === comment.user.id) && (
                            <div className="comment_edit_delete_buttons_div">
                                <OpenModalButton
                                    buttonText={<i className="edit_comment_button fa-solid fa-pen-to-square" />}
                                    modalComponent={<CommentFormModal expenseId={expenseId} commentId={comment.id} />}
                                />
                                <OpenModalButton
                                    buttonText={<i className='remove_comment_button fa-solid fa-trash' />}
                                    modalComponent={<DeleteCommentConfirmationModal comment={comment} />}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
            <OpenModalButton
                buttonText="Post"
                modalComponent={<CommentFormModal expenseId={expenseId}/>}
            />
        </>
    )
}

export default Comments;
