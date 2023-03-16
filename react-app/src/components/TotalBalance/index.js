import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { Redirect, useParams } from "react-router-dom";
import { getFriendExpensesThunk } from "../../store/expenses";
import "./TotalBalance.css";

function TotalBalance() {

    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const dispatch = useDispatch();
    const { friendId } = useParams();
    console.log("typeeeeeeeeeee", typeof friendId);

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

            //in case your navigate to friend page, we just calculate the balance between sessionUser and the friend
            if (friendId) {
                const friendInSettledOwers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === Number(friendId))
                console.log("========================TTTTTTTTTTTTTTTTTTTT==================", friendInSettledOwers);
                if (friendInSettledOwers.length === 1) {
                    userOwed = 0;
                } else {
                    userOwed = Number.parseFloat(splitAmount.toFixed(2))
                }
            }

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

                if (friendId) {
                    userDebt = Number.parseFloat(splitAmount.toFixed(2))

                }
            }
        }
    }
    console.log("UserOwed", userOwed);
    console.log("userDebt", userDebt);
    totalBalance = userOwed - userDebt


    return (
        <div className="total_balance_div">
            <div>Your Total Balance:</div>
            <div>${totalBalance.toFixed(2)}</div>
        </div>
    )
}

export default TotalBalance
