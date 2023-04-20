import { useState } from 'react'
import { useSelector } from 'react-redux'
import ExpenseDetails from '../ExpenseDetails';
import { getMMDDYYYY, getMMDD } from '../../utils/utils'

function PaymentDetails ({ expense }) {
  const [showDetailsId, setShowDetailsId] = useState(false);
  const sessionUser = useSelector(state => state.session.user)

  const splitAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2)
  const expenseDate = new Date(expense.expenseDate)
  const formattedExpenseDate = getMMDD(expenseDate)

  const displayDetails = expense => {
    if (showDetailsId !== expense.id) {
      setShowDetailsId(expense.id)
    } else {
      setShowDetailsId(null)
    }
  }

  let paymentDetails
  if (sessionUser.id !== expense.payer.id) {
    // if user is not payer
    // find when user paid
    const userSettledDate = expense.settledOwers.find(
      user => user.settledUserId === sessionUser.id
    ).settledDate
    const formattedSettledDate = getMMDDYYYY(new Date(userSettledDate))

    paymentDetails = (
      <div className='payment_details'>
        You paid{' '}
        <span className='payment_details_bold'>
          {expense.payer.firstName} {expense.payer.lastName[0]}.
        </span>{' '}
        <span className='payment_details_bold'>${splitAmount}</span> on{' '}
        {formattedSettledDate}
      </div>
    )
  } else {
    // if user is payer
    // iterate over all settled owers
    paymentDetails = expense.settledOwers.map((settledUser, idx) => {
      const formattedSettledDate = getMMDDYYYY(
        new Date(settledUser.settledDate)
      )
      const ower = expense.owers.find(
        ower => ower.id === settledUser.settledUserId
      )

      return (
        <div key={idx} className='payment_details'>
          <span className='payment_details_bold'>
            {ower.firstName} {ower.lastName[0]}.
          </span>{' '}
          paid you <span className='payment_details_bold'>${splitAmount}</span>{' '}
          on {formattedSettledDate}.
        </div>
      )
    })
  }

  return (
    <>
      <div onClick={() => displayDetails(expense)} className='payment_details_div'>
        <div className='payment_details_heading'>
          <div className='payment_details_date'>{formattedExpenseDate}</div>
          <i className="fa-solid fa-receipt" />
          <div className='payment_details_description'>{expense.description}</div>
        </div>
        <div className='payment_details_list'>{paymentDetails}</div>
      </div>
      {showDetailsId === expense.id && <ExpenseDetails expense={expense} />}
    </>
  )
}

export default PaymentDetails
