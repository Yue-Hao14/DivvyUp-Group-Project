import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { Redirect } from "react-router-dom";
import { getAllExpensesThunk } from "../../store/expenses";

function TotalBalance () {

    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.allExpenses)
    const dispatch = useDispatch();

    useEffect(() => {
      if (sessionUser) {
        dispatch(getAllExpensesThunk());
      }
    }, [dispatch, sessionUser]);

    // console.log(sessionUser);
    if (!sessionUser) return <Redirect to='/' />

    let totalBalance  = 0;

    const expensesArr = Object.values(userExpenses);
    // console.log(expensesArr);

    for (let i = 0; i < expensesArr.length; i++) {
        const expense = expensesArr[i];
        // console.log(expense);
          const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
          if (userOwer) {
            totalBalance += expense.amount / (expense.owers.length + 1);
          }
        }

    return (
        <>
            <h2>Your Total Balance: {totalBalance.toFixed(2)}</h2>
        </>
    )
}

export default TotalBalance
