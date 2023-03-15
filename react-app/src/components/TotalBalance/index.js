import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { Redirect } from "react-router-dom";
import { getFriendExpensesThunk } from "../../store/expenses";

function TotalBalance() {

    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionUser) {
            dispatch(getFriendExpensesThunk());
        }
    }, [dispatch, sessionUser]);

    // console.log(sessionUser);
    if (!sessionUser) return <Redirect to='/' />

    const expensesArr = Object.values(userExpenses);

    let userOwed = 0;
    let userDebt = 0;
    let totalBalance = 0;

    for (const expense of expensesArr) {
        const numOwers = expense.owers.length;
        const splitAmount = (expense.amount / (numOwers + 1))

        // If user is payer, they are owed splitAmount * num owers minus (the length of settledOwers * splitAmount)
        if (expense.payer.id === sessionUser.id) {
            // if length of settled owers is less than numOwers
            const numUnsettledOwers = numOwers - expense.settledOwers.length
            if (numUnsettledOwers > 0) {
                userOwed += Number.parseFloat(((splitAmount * numUnsettledOwers).toFixed(2)));
            }
                // find number of users who still owe, multiply the split amount by number of users who still owe
                    // and add to userOwed
        } else {
        // If user is not payer, then they must be an ower
        // If user is an ower, and has not settled their debt, add splitAmount to userDebt
            const userInSettledOwers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === sessionUser.id)
            if (!userInSettledOwers) {
                userDebt += Number.parseFloat(splitAmount.toFixed(2))
            }
        }
    }

    totalBalance = userOwed - userDebt


    // let totalBalance  = 0;

    // const expensesArr = Object.values(userExpenses);
    // // console.log(expensesArr);

    // for (let i = 0; i < expensesArr.length; i++) {
    //     const expense = expensesArr[i];
    //     // console.log(expense);
    //       const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
    //       if (userOwer) {
    //         totalBalance += expense.amount / (expense.owers.length + 1);
    //       }
    //     }

    return (
        <>
            <h2>Your Total Balance: {totalBalance.toFixed(2)}</h2>
        </>
    )
}

export default TotalBalance
