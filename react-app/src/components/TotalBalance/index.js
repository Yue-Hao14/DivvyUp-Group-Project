import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllExpensesThunk } from "../../store/expenses";

function TotalBalance () {
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.allExpenses)


    useEffect(() => {
        dispatch(getAllExpensesThunk())
    }, [dispatch])

    if (!sessionUser) return Redirect('/')

    let totalBalance  = 0;

    for (let expense in userExpenses) {
        if (expense.owers.include(sessionUser)) {
            totalBalance += expense.amount / expense.owers.length;
        }
    }

    return (
        <>
            <h2>Your Total Balance: {totalBalance.toFixed(2)}</h2>
        </>
    )
}

export default TotalBalance
