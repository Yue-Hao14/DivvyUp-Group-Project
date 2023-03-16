import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom"
import { getSettledExpensesThunk } from "../../store/expenses";
import { groupExpensesByMonth } from "../../utils/expenseHelpers";
import SettledExpenses from "./SettledExpenses";

function PaymentHistory() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const settledExpenses = useSelector(state => state.expenses.settledExpenses);

    useEffect(() => {
        dispatch(getSettledExpensesThunk())
    }, [dispatch])

    if (!sessionUser) return Redirect("/")

    const orderedSettledExpenses = groupExpensesByMonth(Object.values(settledExpenses));

    return (
        <>
            <div className="payment_history_title">Payment History</div>
            <div className="expense_summaries_div">
                {Object.values(orderedSettledExpenses).map((expenseList, idx) => {
                    return (
                        <SettledExpenses key={idx} expenses={expenseList} />
                        )
                    })}
            </div>
        </>
    )
}

export default PaymentHistory;
