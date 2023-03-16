// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useModal } from "../../../context/Modal";

function UpdateCommentModal({ expenseId, commentId }) {
//     const comment = useSelector(state => state.comments[expenseId].find(comment => comment.id === commentId))
//     const { closeModal } = useModal;
//     const [commentText, setCommentText] = useState(comment ? comment.comment : "");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = await dispatch(addCommentToExpenseThunk(expenseId, {comment}))

//         if (data) {
//             setErrors(data)
//           } else {
//             closeModal()
//           }
//     }

//     return (
//         <form onSubmit={handleSubmit} className="post_comment_form">
//             <div className="post_comment_form_title">Leave a Comment</div>
//             <ul className="post_comment_modal_error_list">
//                 {errors.map((error, idx) => (
//                     <li key={idx}>{error}</li>
//                 ))}
//             </ul>
//             <textarea
//                 required
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//             />
//             <button type="submit">Post</button>
//         </form>
//     )
    return null
}

export default UpdateCommentModal;
