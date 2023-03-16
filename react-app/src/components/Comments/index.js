import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseCommentsThunk } from "../../store/comments";


function Comments({ expenseId }) {
    const dispatch = useDispatch();
    const comments = useSelector(state => state.comments[expenseId])
    console.log("List of comments for the expense=====================", comments)

    useEffect(() => {
        console.log("Use effect in comments is firing")
        dispatch(getExpenseCommentsThunk(expenseId));
    }, [dispatch])

    return (
        <h1>Hello from the comments section</h1>
    )
}

export default Comments;
