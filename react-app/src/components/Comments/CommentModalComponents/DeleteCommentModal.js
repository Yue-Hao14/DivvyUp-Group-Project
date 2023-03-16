import { useDispatch } from "react-redux";

function DeleteCommentModal({ commentId }) {
    const dispatch = useDispatch();

    return (
        <div>This will be the confirm delete comment modal</div>
    )
}

export default DeleteCommentModal;
