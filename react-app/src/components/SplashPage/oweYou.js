import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFriendExpensesThunk } from '../../store/expenses'

function OweYou ({ friend }) {
  const expenses = useSelector(state => state.expenses.allExpenses)
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch()
  const expensesArr = Object.values(expenses)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getFriendExpensesThunk(friend.id))
    }
  }, [sessionUser, friend.id, dispatch])

  let friendOwed = 0

  // Calculate the total amount of expenses paid by the user and friend
  for (const expense of expensesArr) {
    const numOwers = expense.owers.length

    const splitAmount = expense.amount / (numOwers + 1)

    if (expense.payer.id === sessionUser.id) {
      const friendInOwers = expense.owers.find(
        friendOwer => friendOwer.id === friend.id
      )
      if (friendInOwers) {
        friendOwed += Number.parseFloat(splitAmount.toFixed(2))
      }

      const friendInSettledUsers = expense.settledOwers.find(
        settledOwerId => settledOwerId.settledUserId === friend.id
      )
      if (friendInSettledUsers) {
        friendOwed -= Number.parseFloat(splitAmount.toFixed(2))
      }
    }
  }

  return (
    <>
      {friendOwed > 0 ? (
        <Link key={friend.id} to={`/friends/${friend.id}`}>
          <div>
            <span className='friend-name'>{friend.firstName}</span>
            &nbsp;owes you ${friendOwed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </Link>
      ) : null}
    </>
  )
}

export default OweYou
