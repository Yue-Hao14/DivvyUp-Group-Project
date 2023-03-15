import { groupExpensesByMonth } from "../../utils/expenseHelpers";
import ExpenseSummarySection from "../ExpenseSummaries/ExpenseSummarySection";

function SettledExpenses() {
    const settledExpenses = [];
    // go through all user expenses
        // if user is payer
            // make sure all owers have paid (ie. length of owers matchs length of settledOwers)
        // if user is not payer
            // make sure they are in list of settled owers
    const orderedSettledExpenses = groupExpensesByMonth(settledExpenses);
    return (
        // <div className="expense_summaries_div">
        //     {orderedSettledExpenses.map((expenseList, idx) => {
        //         return (
        //             <ExpenseSummarySection key={idx} expenses={expenseList} />
        //         )
        //     })}
        // </div>
        null
    )
}

export default SettledExpenses;
