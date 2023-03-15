import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriendExpensesThunk } from '../../store/expenses'

function OweYou({friend}) {
    const expenses = useSelector(state => state.expenses.currentExpenseSummaries);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const expensesArr = Object.values(expenses)

    const balance  = 0;

    // Calculate the total amount of expenses paid by the friend
    let totalPaidByFriend = 0;
    expensesArr.forEach((expense) => {
        if (expense.payer.id === friend.id) {
            const numOwers = expense.owers.length;
            totalPaidByFriend += (expense.amount / (numOwers + 1)) * numOwers;
        }
    });


    useEffect(() => {
        if (sessionUser) {
            dispatch(getFriendExpensesThunk(friend.id))
        }
    }, [sessionUser])

    return (
        <div>
            <div>
                <h2>YOU OWE</h2>
            </div>
            <div className="you-owe-list">
                <div>
                    <div>
                        <div>{friend.firstName}</div>
                        <div> owes you ${balance.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default OweYou
