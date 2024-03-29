import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./TotalBalance.css";

function TotalBalance() {
    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const { friendId } = useParams();
    let friends = useSelector(state => state.friends)
    let friendsArr = Object.values(friends)
    let friend = friendsArr.find(person => person.id === Number(friendId))

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
                if (friendInSettledOwers) {
                    userOwed += 0;
                } else {
                    userOwed += Number.parseFloat(splitAmount.toFixed(2))
                }
            } else if (numUnsettledOwers > 0) {
                // find number of users who still owe, multiply the split amount by number of users who still owe
                // and add to userOwed
                userOwed += Number.parseFloat(((splitAmount * numUnsettledOwers).toFixed(2)));
            }

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

    return (
        <div className="total_balance_div">
            <div className="total_balance_label_div">Your Total Balance:</div>
            <div className={totalBalance >= 0 ? "positive_balance" : "negative_balance"}>
                {totalBalance > 0 && friendId ? (
                    <p>{friend.firstName} owes you ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                ) : totalBalance < 0 && friendId ? (
                    <p>You owe {friend.firstName} ${Math.abs(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                ) : totalBalance === 0 && friendId ? (
                    <p>You are all settled up</p>
                ) : totalBalance > 0 ? (
                    <p>you are owed ${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                ) : totalBalance < 0 ? (<p>you owe ${Math.abs(totalBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                ) : (<p>You are all settled up</p>)
                }
            </div>
        </div>
    )
}
export default TotalBalance
