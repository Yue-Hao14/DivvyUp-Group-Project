import { useDispatch, useSelector } from 'react-redux'
import TotalBalance from '../TotalBalance'
import { getAllExpensesThunk } from '../../store/expenses'
import ExpenseSummaries from '../ExpenseSummaries'
import { useState } from 'react'

import './AllExpenses.css'
import Loading from '../Loading'
import { useEffect } from 'react'

function AllExpenses() {
  const currentExpenseSummaries = useSelector(
    state => state.expenses.currentExpenseSummaries
  )
  const allExpenses = useSelector(state => state.expenses.allExpenses)
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  // if the current expense summaries slice of state does not equal
  // all expenses slice of state dispatch thunk
  // possibly due to adding a new expense
  // or being on a friend's expense page prior
  useEffect(() => {
    if (currentExpenseSummaries !== allExpenses) {
      dispatch(getAllExpensesThunk())
        .then(() => setIsLoaded(true))
    } else setIsLoaded(true)
  },[dispatch, allExpenses, currentExpenseSummaries])

  return (
    <>
      {isLoaded ? (
        <div className='all_expenses_container main_content'>
        <section className='all_expenses_header_container'>
          <div className='all_expenses_header_label'>
            <i className='fa-solid fa-coins all_expenses_icon'></i>
            <div className='all_expenses_header'>All Expenses</div>
          </div>
        </section>
        <section className='all_expenses_total_balance total_balance_content'>
          <TotalBalance />
        </section>
        <section className='all_expenses_expense_summaries'>
          <ExpenseSummaries />
        </section>
      </div>
      ) : (
        <Loading />
      )}

    </>
  )
}

export default AllExpenses;
