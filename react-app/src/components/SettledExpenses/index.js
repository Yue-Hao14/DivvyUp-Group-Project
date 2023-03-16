import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom"
import { getSettledExpensesThunk } from "../../store/expenses";
import ExpenseSummarySection from "../ExpenseSummaries/ExpenseSummarySection";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";

function SettledExpenses() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const settledExpenses = useSelector(state => state.expenses.settledExpenses);

    useEffect(() => {
        dispatch(getSettledExpensesThunk())
    }, [dispatch])

    if (!sessionUser) return Redirect("/")

    const orderedSettledExpenses = groupExpensesByMonth(Object.values(settledExpenses));

    return (
        <div className="expense_summaries_div">
            {Object.values(orderedSettledExpenses).map((expenseList, idx) => {
                return (
                    <ExpenseSummarySection key={idx} expenses={expenseList} />
                )
            })}
        </div>
    )
}

export default SettledExpenses;
