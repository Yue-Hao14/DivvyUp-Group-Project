import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleExpenseDetailsThunk } from "../../store/expenses";
import ExpenseDetails from "../ExpenseDetails";
import "./ExpenseSummaries.css";

function FriendExpenseSummary({ expenses }) {
  const dispatch = useDispatch();
  const [showDetailsId, setShowDetailsId] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const { friendId } = useParams();
  const groupMonthandYear = new Date(expenses[0].expenseDate)
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const displayDetails = (expense) => {
    if (showDetailsId !== expense.id) {
      dispatch(getSingleExpenseDetailsThunk(expense.id)).then(() =>
        setShowDetailsId(expense.id)
      );
    } else {
      setShowDetailsId(null);
    }
  };

  return (
    <div className="expense_summary_container">
        <div className="expense_summary_month_year">{months[groupMonthandYear.getMonth()]} {groupMonthandYear.getFullYear()}</div>
        {expenses.map((expense) => {
            const date = new Date(expense.expenseDate);

            const formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            });

            const splitAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2);

            // if current user not payer, then they are the ower
            // if the current user is the payer and there is no friend, show how much the current user is owed for that expense
            // else show how much the friend owes the current user

            let ower = expense.owers.find(
            (ower) => ower.id === sessionUser.id || ower.id === parseInt(friendId)
            );

            return !!ower && (
            <div
                key={expense.id}
                className="expense_summary_details_container"
                onClick={() => displayDetails(expense)}
            >
                <div className="expense_summary_expense_date">{formattedDate}</div>
                <div className="expense_summary_expense_icon">icon</div>
                <div className="expense_summary_expense_description">
                {expense.description}
                </div>
                <div className="expense_summary_expense_payerInfo">
                {expense.payer.firstName} {expense.payer.lastName[0]}.
                paid <span className="expense_summary_amount">${expense.amount}</span>
                </div>
                <div className="expense_summary_expense_payerInfo">
                {ower.firstName} {ower.lastName[0]}. owes{" "}
                <span className="expense_summary_amount">${splitAmount}</span>
                </div>
            </div>
            );
        })}
        {showDetailsId && <ExpenseDetails />}
    </div>
  );
}

export default FriendExpenseSummary;
