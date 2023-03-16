import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../context/Modal'
import { addCommentToExpenseThunk } from '../../../store/comments';
import "./CommentModals.css"

function PostCommentModal({expenseId}) {
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(addCommentToExpenseThunk(expenseId, {comment}))

        if (data) {
            setErrors(data)
          } else {
            closeModal()
          }
    }

    return (
        <form onSubmit={handleSubmit} className="post_comment_form">
            <div className="post_comment_form_title">Leave a Comment</div>
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
            <button type="submit">Post</button>
        </form>
    )
}

export default PostCommentModal;
