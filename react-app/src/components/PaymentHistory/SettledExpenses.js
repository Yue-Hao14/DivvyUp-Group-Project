import PaymentDetails from "./PaymentDetails"
import { getMMMYYYYY } from "../../utils/utils"

function SettledExpenses({ expenses }) {
    const dateHeading = getMMMYYYYY(new Date(expenses[0].expenseDate))


    return (
        <div className="settled_expenses_div">
            <div className="settled_expenses_date_heading">{dateHeading}</div>
            {expenses.map(expense => {
                return (
                    <PaymentDetails key={expense.id} expense={expense} />
                )
            })}
        </div>
    )
}

export default SettledExpenses;
