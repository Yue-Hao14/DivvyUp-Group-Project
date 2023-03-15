import { useSelector } from "react-redux";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";

function SettledExpenses() {
    const settledExpenses = useSelector(state => state.expenses.settledExpenses);
    console.log("Settled Expenses in SettledExpenses Modal", settledExpenses)
    // make sure settledExpenses slice of state is up to date
    // use settledExpenses slice of state to get settled expenses list

    // const orderedSettledExpenses = groupExpensesByMonth(settledExpenses);
    return (
        null
    )
}

export default SettledExpenses;
