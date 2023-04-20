import { months } from '../../utils/utils'
import ExpenseSummary from './ExpenseSummary'
import './ExpenseSummaries.css'

function ExpenseSummarySection ({ expenses }) {
  const groupMonthandYear = new Date(expenses[0]?.expenseDate)
  return (
    <div className='expense_summary_container'>
      {groupMonthandYear &&
      <div className='expense_summary_month_year'>
        {months[groupMonthandYear.getUTCMonth()]} {groupMonthandYear.getUTCFullYear()}
      </div>

      }
      <section className='expense_summaries_container'>
        {expenses.map((expense) => {
          return (
            <ExpenseSummary
            key={expense.id}
            expense={expense}
            />
            )
          })}
      </section>
    </div>
  )
}

export default ExpenseSummarySection
