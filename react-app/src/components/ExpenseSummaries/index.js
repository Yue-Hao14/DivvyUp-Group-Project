import { useSelector } from "react-redux"
import { groupExpensesByMonth } from "../../utils/expenseHelpers";

function ExpenseSummaries() {
    const expenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const orderedExpenses = groupExpensesByMonth(Object.values(expenses));

    console.log("ordered expenses in expense summaries", orderedExpenses)

    return (
        <div className="expense_summaries_div">
            {Object.values(expenses).map(expense => (
                <>
                    {Object.values(orderedExpenses).map((groupedExpenses, idx) => {
                        // we need to figure out a way to get the month and year form the orderedExpenses
                        <ExpenseSummary key={idx} expenses={groupedExpenses} />
                    })}
                </>

            ))}
        </div>
    )
}

export default ExpenseSummaries;
