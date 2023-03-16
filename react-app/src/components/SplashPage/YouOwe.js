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



    let outstandingWithFriend = 0;


    // Calculate the total amount of expenses paid by the user and friend
    for (const expense of expensesArr) {
        const numOwers = expense.owers.length;
        const splitAmount = (expense.amount / (numOwers + 1))


        if (expense.payer.id === friend.id) {
            // console.log("yes2");
            const userInOwers = expense.owers.find(userInOwer => userInOwer.id === sessionUser.id)
            if  (userInOwers) {
                outstandingWithFriend += Number.parseFloat(splitAmount.toFixed(2))

            }

            const userInSettledOwers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === sessionUser.id)
            if (userInSettledOwers) {

                outstandingWithFriend -= Number.parseFloat(splitAmount.toFixed(2))

            }
        }

    }


    return (
      <>
        {outstandingWithFriend > 0 ?
          <div>
              <div>{friend.firstName}</div>
              <div> you owe ${outstandingWithFriend.toFixed(2)}</div>

          </div> : null}
      </>
    );
}

export default YouOwe;
