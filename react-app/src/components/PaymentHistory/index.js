import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getSettledExpensesThunk } from '../../store/expenses'
import { groupExpensesByMonth } from '../../utils/expenseHelpers'
import SettledExpenses from './SettledExpenses'
import './PaymentHistory.css'
import { useState } from 'react'
import Loading from '../Loading'

function PaymentHistory() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const settledExpenses = useSelector(state => state.expenses.settledExpenses)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(getSettledExpensesThunk())
      .then(() => setIsLoaded(true))
  }, [dispatch])

  if (!sessionUser) return Redirect('/')

  const orderedSettledExpenses = groupExpensesByMonth(
    Object.values(settledExpenses)
  )

  return (
    <>
      {isLoaded ? (
      <div className='payment_history_container'>
        <section className='settled_expenses_header_container'>
          <div className='settled_expenses_header_label'>
            <i className='fa-solid fa-handshake settled_expenses_icon'></i>
            <div className='settled_expenses_header'>Payment History</div>
          </div>
        </section>
        <section className='settled_expense_summaries_div'>
          {Object.values(orderedSettledExpenses).map((expenseList, idx) => {
            return (
                <SettledExpenses key={idx} expenses={expenseList} />
            )
          })}
        </section>
      </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default PaymentHistory
