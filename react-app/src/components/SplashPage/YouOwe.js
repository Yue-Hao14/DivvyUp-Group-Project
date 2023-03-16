import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendExpensesThunk } from '../../store/expenses';

function YouOwe({ friend }) {
    const expenses = useSelector(state => state.expenses.allExpenses);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const expensesArr = Object.values(expenses);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getFriendExpensesThunk(friend.id))
        }
    }, [sessionUser]);

    let balance = 0;
    let paidByFriend = 0;
    let paidByUser = 0;

    // Calculate the total amount of expenses paid by the user and friend
    for (const expense of expensesArr) {
        const numOwers = expense.owers.length;
        const splitAmount = (expense.amount / (numOwers + 1))

        if (expense.payer.id === sessionUser.id) {
            console.log("yes1");
            const friendInOwers = expense.owers.find(friendOwer => friendOwer.id === friend.id)
            if (friendInOwers) {
                paidByFriend += Number.parseFloat(splitAmount.toFixed(2))
            }

            const friendInSettledUsers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === friend.id)
            if (friendInSettledUsers) {
                paidByFriend -= Number.parseFloat(splitAmount.toFixed(2))
            }
        }

        if (expense.payer.id === friend.id) {
            console.log("yes2");
            const userInOwers = expense.owers.find(userInOwer => userInOwer.id === sessionUser.id)
            if  (userInOwers) {
                paidByUser += Number.parseFloat(splitAmount.toFixed(2))
            }

            const userInSettledOwers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === sessionUser.id)
            if (userInSettledOwers) {
                paidByUser -= Number.parseFloat(splitAmount.toFixed(2))
            }
        }

    }
    balance = paidByUser - paidByFriend
    return (
      <>
        {balance > 0 ?
          <div>
              <div>{friend.firstName}</div>
              <div> you owe ${balance.toFixed(2)}</div>
          </div> : null}
      </>
    );
}

export default YouOwe;
