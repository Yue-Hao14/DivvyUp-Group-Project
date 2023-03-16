import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getSettledExpensesThunk } from '../../store/expenses'
import { groupExpensesByMonth } from '../../utils/expenseHelpers'
import SettledExpenses from './SettledExpenses'
import './PaymentHistory.css'

function PaymentHistory () {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const settledExpenses = useSelector(state => state.expenses.settledExpenses)

  useEffect(() => {
    dispatch(getSettledExpensesThunk())
  }, [dispatch])

  if (!sessionUser) return Redirect('/')

  const orderedSettledExpenses = groupExpensesByMonth(
    Object.values(settledExpenses)
  )

  return (
    <>
      <div className='settled_expenses_header_container'>
        <div className='settled_expenses_header_label'>
          <i className='fa-solid fa-handshake settled_expenses_icon'></i>
          <div className='settled_expenses_header'>Payment History</div>
        </div>
      </div>
      {/* <div className='payment_history_title'>Payment History</div> */}
      <div className='expense_summaries_div'>
        {Object.values(orderedSettledExpenses).map((expenseList, idx) => {
          return (
            <div className='settled_expenses_container' key={idx}>
              <SettledExpenses expenses={expenseList} />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PaymentHistory