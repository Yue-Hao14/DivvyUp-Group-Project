import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { getSingleExpenseDetailsThunk } from "../../store/expenses";
import ExpenseInfo from "./ExpenseInfo";
import EditAndDeleteButtons from "./EditAndDeleteButtons"
import ExpenseUserInfo from "./ExpenseInfo";
import './ExpenseDetails.css'

function ExpenseDetails(expenseId) {
    // dispatch thunk to get spot details added to store
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getSingleExpenseDetailsThunk(expenseId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
        {isLoaded
            ? <div className="expense_details_div">
                <div className="expense_details_div_upper">
                    <div className="expense_details_icon"></div>
                    <ExpenseInfo />
                    <EditAndDeleteButtons />
                </div>
                <div className="expense_details_div_lower">
                    <ExpenseUserInfo />
                    <div className="expense_details_comments_div">
                        {/* This is where a comments component will go */}
                    </div>
                </div>
            </div>
            : null }
        </>
    )
}

export default ExpenseDetails
