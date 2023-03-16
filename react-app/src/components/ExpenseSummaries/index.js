import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";
import ExpenseSummarySection from "./ExpenseSummarySection";

function ExpenseSummaries() {
    const expenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const orderedExpenses = groupExpensesByMonth(Object.values(expenses));
    const friendId = useParams().friendId
    const expenseArr = Object.values(orderedExpenses)[0]

    // gathering unsettled expense between user and this friend
    let unsettledExpenseArr = []
    expenseArr.forEach(expense => {
        const settledOwersArr = expense.settledOwers

        // if there is settledOwers, we check if this friend is part of settledOwers
        if (settledOwersArr.length > 0) {
            let settledOwersIds = settledOwersArr.map(settledOwer => settledOwer.settledUserId)
            // console.log("settledOwersIds", settledOwersIds)

            // if friend is not part of the settledOwers, we add this expense to unsettledExpenseArr
            if (!settledOwersIds.includes(Number(friendId))) unsettledExpenseArr.push(expense)
        } else {
            // when there is no settled owers at all, just add this expense to unsettledExpenseArr
            unsettledExpenseArr.push(expense)
        }
    })
    // console.log("unsettledExpenseArr",unsettledExpenseArr)

    return (
        <div className="expense_summaries_div">
            { // check if we are on friend page
                friendId ?
                // if on friend page, only show unsettledExpense with this friend
                    [unsettledExpenseArr].map(expense => {
                        return (<ExpenseSummarySection expenses={expense} />)
                    })
                    // if we are not on a friend page(i.e. on "All Expenses" page, then show settled and unsettled expenses)
                    :
                    Object.values(orderedExpenses).map((expenseList, idx) => {
                        return (<ExpenseSummarySection key={idx} expenses={expenseList} />)
                    })}
        </div>
    )
}

export default ExpenseSummaries;
