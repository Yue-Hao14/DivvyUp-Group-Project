import { useSelector } from "react-redux"

function ExpenseInfo() {
    const expenseDetails = useSelector(state => state.expenses.currentExpenseDetails)

    return (
        <>
            {!!expenseDetails && (<div className="expense_details_info_div">
                <div className="expense_details_info_expense_description">{expenseDetails.description}</div>
                <div className="expense_details_info_expense_amount">{expenseDetails.amount}</div>
                {/* Going to want to format the dates, probably with a helper function maybe make a utils folder */}
                <div className="expense_details_info_added_by">{`Added by ${expenseDetails.payer.firstName} ${expenseDetails.payer.lastName[0]}. on ${expenseDetails.createdAt}`}</div>
                <div className="expense_details_info_last_updated">{`Last updated by ${expenseDetails.payer.firstName} ${expenseDetails.payer.lastName[0]}. on ${expenseDetails.updatedAt}`}</div>
            </div>
            )}
        </>
    )
}

export default ExpenseInfo
