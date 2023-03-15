import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleExpenseDetailsThunk } from "../../store/expenses";
import ExpenseDetails from "../ExpenseDetails"
import './ExpenseSummaries.css'

// TODO: FORMAT DATE STRING
function FriendExpenseSummary({ expenses }) {
    const dispatch = useDispatch();
    // can get friend details from state
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const [showDetailsId, setShowDetailsId] = useState(null)
    const sessionUser = useSelector(state => state.session.user);
    // might be able to refactor this component to be used with all expense summaries component
    const { friendId } = useParams()
    const date = new Date(expenses[0].expenseDate)

    const displayDetails = (expense) => {
        if (showDetailsId !== expense.id) {
            dispatch(getSingleExpenseDetailsThunk(expense.id))
            .then(() => setShowDetailsId(expense.id))
        } else {
            setShowDetailsId(null)
        }
    }

    return (
        <div className="expense_summary_container">
            <div className="expense_summary_month_year">{months[date.getMonth()]} {date.getFullYear()}</div>
            {expenses.map(expense => {
                // calculate how much is owed
                const splitAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2);
                // filter owers to find the first instance of either the user or the friend
                // check expnse payer, if not current user, then current user is ower, otherwise friend is ower
                let ower = expense.owers.find(ower => (ower.id === sessionUser.id || ower.id === parseInt(friendId)))
                return (
                    <>
                        {!!ower && (
                            <>
                            <div onClick={() => displayDetails(expense)} key={expense.id} className="expense_summary_details_container">
                                <div className="expense_summary_expense_date">{expense.expenseDate}</div>
                                <div className="expense_summary_expense_icon">icon</div>
                                <div className="expense_summary_expense_description">{expense.description}</div>
                                <div className="expense_summary_expense_payerInfo">{expense.payer.firstName} {expense.payer.lastName[0]}. paid <span className="expense_summary_amount">${expense.amount}</span></div>
                                <div className="expense_summary_expense_payerInfo">{ower.firstName} {ower.lastName[0]}. owes <span className="expense_summary_amount">${splitAmount}</span></div>
                            </div>
                            {/* need to only show expense details for the currently clicked expense */}
                            {(showDetailsId === expense.id) && <ExpenseDetails />}
                            </>
                        )}
                    </>
                )}
            )}
        </div>
    )
}


export default FriendExpenseSummary;
