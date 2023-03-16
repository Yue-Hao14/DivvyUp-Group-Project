import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExpensesThunk } from '../../store/expenses';

function YouOwe({ friend }) {
    const expenses = useSelector(state => state.expenses.allExpenses);
    const sessionUser = useSelector(state => state.session.user);
    // console.log("================", friend.id);
    // console.log("=========================", friend.firstName);
    const dispatch = useDispatch();
    const expensesArr = Object.values(expenses);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllExpensesThunk(friend.id))
        }
    }, [sessionUser]);


    let friendOwed = 0;


    // Calculate the total amount of expenses paid by the user and friend
    for (const expense of expensesArr) {
        const numOwers = expense.owers.length;


        const splitAmount = (expense.amount / (numOwers + 1))

        if (expense.payer.id === sessionUser.id) {
            console.log("yes1");
            const friendInOwers = expense.owers.find(friendOwer => friendOwer.id === friend.id)
            if (friendInOwers) {

                friendOwed += Number.parseFloat(splitAmount.toFixed(2))

            }

            const friendInSettledUsers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === friend.id)
            if (friendInSettledUsers) {

                friendOwed -= Number.parseFloat(splitAmount.toFixed(2))
            }
        }
    }


    return (
      <>
        {friendOwed > 0 ?
          <div>
              <div>{friend.firstName}</div>
              <div> owes you ${friendOwed.toFixed(2)}</div>

          </div> : null}
      </>
    );
}

export default YouOwe;