
function ExpenseSummary(expenses) {
    return (
        <div className="expense_summary_container">
            <div className="expense_summary_month_year"></div>
            {expenses.map(expense => {
                <div className="expense_summary_details_container">
                    <div className="expense_summary_expense_date"></div>
                    <div className="expense_summary_expense_icon">icon</div>
                    <div className="expense_summary_expense_description">{expense.description}</div>
                    <div className="expense_summary_expense_payerInfo">{expense.payer.firstName} paid {expense.amount}</div>
                    <div className="expense_summary_expense_payerInfo">{expense.payer.firstName} paid {expense.amount}</div>
                </div>
            })}
        </div>
    )

}

export default ExpenseSummary;
