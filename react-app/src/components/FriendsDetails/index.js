import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getFriendExpensesThunk } from "../../store/expenses";
import ExpenseSummaries from "../ExpenseSummaries";

function FriendDetails() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { friendId }= useParams();
    const friend = useSelector(state => state.friends[friendId])

    // dispatch getFriendExpenses thunk on load, or when we switch friend pages
    useEffect(() => {
        dispatch(getFriendExpensesThunk(friendId)).then(() => setIsLoaded(true))
    }, [dispatch, friendId])


    if (!friend) return Redirect('/'); // redirect to dashboard if the user is not in the current_user's friends list

    return (
        <div className="friend_details_div">
            <div className="friend_details_info_div">
                <div className="friend_details_user_info_div">
                    <div className="friend_details_icon">User Icon</div>
                    <div className="friend_details_user_info">{friend.firstName} {friend.lastName}</div>
                </div>
                <div className="friend_details_add_expense_button"></div>
            </div>
            <div className="">
                {isLoaded && <ExpenseSummaries />}
            </div>
        </div>
    )
}

export default FriendDetails;
