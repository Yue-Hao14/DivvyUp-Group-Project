import { useDispatch, useSelector } from 'react-redux'
import TotalBalance from '../TotalBalance'
import { getAllExpensesThunk } from '../../store/expenses'
import ExpenseSummaries from '../ExpenseSummaries'

import './AllExpenses.css'

function AllExpenses () {
  const currentExpenseSummaries = useSelector(
    state => state.expenses.currentExpenseSummaries
  )
  const allExpenses = useSelector(state => state.expenses.allExpenses)
  const dispatch = useDispatch()

  // if the current expense summaries slice of state does not equal
  // all expenses slice of state dispatch thunk
  // possibly due to adding a new expense
  // or being on a friend's expense page prior
  if (currentExpenseSummaries !== allExpenses) {
    dispatch(getAllExpensesThunk())
  }

  return (
    <>
      <div className='all_expenses_header_container'>
        <div className='all_expenses_header_label'>
          <i className='fa-solid fa-coins all_expenses_icon'></i>
          <div className='all_expenses_header'>All Expenses</div>
        </div>
      </div>
      <ExpenseSummaries />
      <TotalBalance />
    </>
  )
}

export default AllExpenses
