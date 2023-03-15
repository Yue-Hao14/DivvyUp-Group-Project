import { useSelector } from "react-redux";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";
import ExpenseSummary from "./ExpenseSummary";

function AllExpenseSummaries() {
    const expenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const orderedExpenses = groupExpensesByMonth(Object.values(expenses));

    return (
        <div className="expense_summaries_div">
            {Object.values(orderedExpenses).map((expenseList, idx) => {
                return (
                    <ExpenseSummary key={idx} expenses={expenseList} />
                )
            })}
        </div>
    )
}

export default AllExpenseSummaries;
