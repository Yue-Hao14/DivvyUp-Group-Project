import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseCommentsThunk } from "../../store/comments";
import { getMMDDYYYY } from "../../utils/utils";
import OpenModalButton from "../OpenModalButton";
import "./Comments.css"
import PostCommentModal from "./CommentModalComponents/PostCommentModal";
import UpdateCommentModal from "./CommentModalComponents/UpdateCommentModal";
import DeleteCommentModal from "./CommentModalComponents/DeleteCommentModal";


function Comments({ expenseId }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => state.comments[expenseId])
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
                    <div className="comment_div">
                        <div className="comment">{comment.comment}</div>
                        <div className="comment_timestamp">Created On: {fomattedCreatedAt} by {comment.user.firstName} {comment.user.lastName[0]}.</div>
                        {(comment.createdAt !== comment.updatedAt) && (
                            <div className="comment_timestamp">Updated At: {fomattedUpdatedAt}</div>
                        )}
                        {(sessionUser.id === comment.user.id) && (
                            <>
                                <OpenModalButton
                                    buttonText="Edit Comment" // change to icon later
                                    modalComponent={<UpdateCommentModal />}
                                />
                                <OpenModalButton
                                    buttonText="Delete Comment" // change to icons later
                                    modalComponent={<DeleteCommentModal />}
                                />
                            </>
                        )}
                    </div>
                )
            })}
            <OpenModalButton
                buttonText="Add a Comment"
                modalComponent={<PostCommentModal />}
            />
        </>
    )
}

export default Comments;
