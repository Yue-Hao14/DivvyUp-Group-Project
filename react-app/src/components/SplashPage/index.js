import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoggedOutSplashPage from '../LoggedOutSplashPage'
import { getAllExpensesThunk } from '../../store/expenses'
import './Splash.css'
import OweYou from './oweYou'
import YouOwe from './YouOwe'

function SplashPage () {
  const userExpenses = useSelector(state => state.expenses.allExpenses)
  const sessionUser = useSelector(state => state.session.user)
  const friendsObj = useSelector(state => state.friends)
  const friends = Object.values(friendsObj)
  const dispatch = useDispatch()

  const expensesArr = Object.values(userExpenses)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllExpensesThunk())
    }
  }, [dispatch, sessionUser])

  if (!sessionUser) return <LoggedOutSplashPage /> // account for if the user logs out on this page

  let userOwed = 0
  let userDebt = 0
  let totalBalance = 0
  // iterate through each exepense and determine how much user owes and is owed
  for (const expense of expensesArr) {
    const numOwers = expense.owers.length
    const splitAmount = expense.amount / (numOwers + 1)

    // If user is payer, they are owed splitAmount * num owers minus (the length of settledOwers * splitAmount)
    if (expense.payer.id === sessionUser.id) {
      // if length of settled owers is less than numOwers
      const numUnsettledOwers = numOwers - expense.settledOwers.length

      if (numUnsettledOwers > 0) {
        userOwed += Number.parseFloat(
          (splitAmount * numUnsettledOwers).toFixed(2)
        )
      }
      // find number of users who still owe, multiply the split amount by number of users who still owe
      // and add to userOwed
    } else {
      // If user is not payer, then they must be an ower
      // If user is an ower, and has not settled their debt, add splitAmount to userDebt
      const userInSettledOwers = expense.settledOwers.find(
        settledOwerId => settledOwerId.settledUserId === sessionUser.id
      )

      if (!userInSettledOwers) {
        userDebt += Number.parseFloat(splitAmount.toFixed(2))
      }
    }
  }

  totalBalance = userOwed - userDebt

  return (
    <>
      <div className='splash-page-wrapper'>
        <div className='splash-page-header-container'>
          <div className='splash-page-header-button'>
            <i class='fa-solid fa-table'></i>
            <h1 className='splash-page-title'>Dashboard</h1>
            {/* <div className='splash-page-button'>
              <OpenModalButton
                modalComponent={<AddExpenseModal />}
                buttonText='Add an Expense'
              />
            </div> */}
          </div>
        </div>
        <div className='splash-page-balance-container'>
          <div className='splash-page-total-balance-container'>
            <div>
              <h3>Total balance</h3>
            </div>
            <div
              className={
                totalBalance < 0
                  ? 'total-balance-negative'
                  : 'total-balance-positive'
              }
            >
              {totalBalance < 0 ? '- $' : '$'}
              {Math.abs(totalBalance).toFixed(2)}
            </div>
          </div>
          <div className='splash-page-owe-container'>
            <div>
              <h3>You owe</h3>
            </div>
            <div>${userDebt.toFixed(2)}</div>
          </div>
          <div className='splash-page-are-owe-container'>
            <div>
              <h3>You are owed</h3>
            </div>
            <div>${userOwed.toFixed(2)}</div>
          </div>
        </div>
        <div className='splash-page-content-container'>
          <div className='you-owe-details-container'>
            <div>
              <h2>YOU OWE</h2>
            </div>
            <div className='you-owe-list'>
              {friends.map(friend => (
                <YouOwe key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
          <div className='you-are-owed-details-container'>
            <div>
              <h2>YOU ARE OWED</h2>
            </div>
            <div className='you-are-owed-list'>
              {friends.map(friend => (
                <OweYou key={friend.id} friend={friend} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SplashPage
