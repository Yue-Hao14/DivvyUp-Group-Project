import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { months } from "../../utils/utils";
import ExpenseDetails from "../ExpenseDetails";
import ExpenseSummary from "./ExpenseSummary";
import "./ExpenseSummaries.css";

function ExpenseSummarySection({ expenses }) {
  // const sessionUser = useSelector((state) => state.session.user);
  // const [showDetailsId, setShowDetailsId] = useState(null);
  // const { friendId } = useParams();
  const groupMonthandYear = new Date(expenses[0].expenseDate)


  return (
    <div className="expense_summary_container">
        <div className="expense_summary_month_year">{months[groupMonthandYear.getMonth()]} {groupMonthandYear.getFullYear()}</div>
        {expenses.map((expense) => {
            return <ExpenseSummary key={expense.id} expense={expense} />
        })}
    </div>
  );
}

export default ExpenseSummarySection;
