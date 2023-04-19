import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";
import ExpenseSummarySection from "./ExpenseSummarySection";
import NoPendingExpenses from "../NoPendingExpenses";

function ExpenseSummaries() {
    const expenses = useSelector(state => Object.values(state.expenses.currentExpenseSummaries))
    const sessionUser = useSelector(state => state.session.user);
    const friendId = useParams().friendId

    let orderedExpenses = [];
    if (friendId) {
        // do logic to get only unsettled expenses between friend and user
        const unsettledFriendExpenses = expenses.filter(expense => {

            const settledOwers = expense.settledOwers.map(settledOwer => settledOwer.settledUserId)

            return (!(settledOwers.includes(sessionUser.id) || settledOwers.includes(Number(friendId))))
        });

        orderedExpenses = groupExpensesByMonth(unsettledFriendExpenses);
    } else {
        orderedExpenses = groupExpensesByMonth(expenses);
    }

    return (
        <div className="expense_summaries_div" >
            {Object.values(orderedExpenses).length > 0 ?
                Object.values(orderedExpenses).map((expenseList, idx) => {
                    return <ExpenseSummarySection key={idx} expenses={expenseList} />
                })
                :
                <NoPendingExpenses />
            }
        </div>
    )
}

export default ExpenseSummaries;
