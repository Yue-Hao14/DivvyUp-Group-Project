import { useState } from "react"
import { useDispatch } from "react-redux"
import { getSingleExpenseDetailsThunk } from "../../store/expenses"

function ExpenseSummary({ expenses }) {
    const dispatch = useDispatch()
    const [showDetailsId, setShowDetailsId] = useState(null)
    const date = new Date(expenses[0].expenseDate)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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
                return (
                    <>
                        <div onClick={() => displayDetails(expense)} key={expense.id} className="expense_summary_details_container">
                            This is where the expense summary will be
                        </div>
                        {(showDetailsId === expense.id) && <div>This will be expense details</div>}
                    </>
                )
            })}
        </div>
    )
}

export default ExpenseSummary
