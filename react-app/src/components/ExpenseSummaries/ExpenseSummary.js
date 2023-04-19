import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { getMMDD } from '../../utils/utils'
import ExpenseDetails from '../ExpenseDetails'

function ExpenseSummary ({ expense }) {
  const sessionUser = useSelector(state => state.session.user)
  const [showDetailsId, setShowDetailsId] = useState(false)
  const { friendId } = useParams()
  const friend = useSelector(state => state.friends[parseInt(friendId)])

  const expenseDate = new Date(expense.expenseDate)
  const formattedExpenseDate = getMMDD(expenseDate)

  const displayDetails = expense => {
    if (showDetailsId !== expense.id) {
      setShowDetailsId(expense.id)
    } else {
      setShowDetailsId(null)
    }
  }

  if (!sessionUser) return Redirect('/')

  const splitAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2)
  const payerAmount = (
    expense.amount -
    splitAmount * expense.owers.length
  ).toFixed(2)

  let owerDescription
  if (sessionUser.id !== expense.payer.id) {
    // if current user not payer, then they are the ower
    owerDescription = (
      <div className='expense_summary_expense_payerInfo'>
        {sessionUser.firstName} {sessionUser.lastName[0]}. owes{' '}
        <span className='expense_summary_amount'>${splitAmount}</span>
      </div>
    )
  } else if (!friend) {
    // if the current user is the payer and there is no friend, show how much the current user is owed for that expense
    owerDescription = (
      <div className='expense_summary_expense_payerInfo'>
        {sessionUser.firstName} {sessionUser.lastName[0]}. is owed{' '}
        <span className='expense_summary_amount'>
          ${(expense.amount - payerAmount).toFixed(2)}
        </span>
      </div>
    )
  } else {
    // else show how much the friend owes the current user
    owerDescription = (
      <div className='expense_summary_expense_payerInfo'>
        {friend.firstName} {friend.lastName[0]}. owes{' '}
        <span className='expense_summary_amount'>${splitAmount}</span>
      </div>
    )
  }

  return (
    <div
      className={
        expense.owers.length === expense.settledOwers.length
          ? 'settled'
          : 'unsettled'
      }
    >
      <div
        onClick={() => displayDetails(expense)}
        className='expense_summary_details_container'
      >
        <div className='expense_summary_expense_date'>
          {formattedExpenseDate}
        </div>
        <div className='expense_summary_expense_description'>
          <div className='expense_summary_icon'>
            <i className='fa-solid fa-receipt' />
          </div>
          {expense.description}
        </div>
          <div className='expense_summary_expense_payerInfo'>
            {expense.payer.firstName} {expense.payer.lastName[0]}. paid{" "}
            <span className='expense_summary_amount'>
              ${expense.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          {owerDescription}
      </div>
      {showDetailsId === expense.id && <ExpenseDetails expense={expense} />}
    </div>
  )
}

export default ExpenseSummary
