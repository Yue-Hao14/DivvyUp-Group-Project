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

    if (!sessionUser) return <Redirect to='/' />

    let totalBalance  = 0;

    const expensesArr = Object.values(userExpenses);

    for (let i = 0; i < expensesArr.length; i++) {
        const expense = expensesArr[i];
        if (expense.owers && expense.owers.includes(sessionUser)) {
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
