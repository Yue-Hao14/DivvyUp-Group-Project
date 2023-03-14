import { useSelector } from "react-redux"

function ExpenseUserInfo() {
    const expenseDetails = useSelector(state => state.expenses.currentExpenseDetails)

    // might have a type issue here with expenseDetails.amount (might be string)
    const owerAmount = (expenseDetails.amount / (expenseDetails.owers.length + 1)).toFixed(2)

    return (
        <div className="expense_details_info_div">
            <div className="expense_details_user_info_div">
                <i className="expense_details_user_icon fa-solid fa-user" />
                <div className="expense_details_user_info">
                    <span className="expense_details_user_name">{`${expenseDetails.payer.firstName} ${expenseDetails.payer.lastName[0]}.`}</span> paid <span className="expense_details_user_amount">{`${expenseDetails.amount}`}</span>
                </div>
            </div>
            {expenseDetails.owers.map(ower => {
                return (
                    <div key={ower.id} className="expense_details_user_info_div">
                        <i className="expense_details_user_icon fa-solid fa-user" />
                        <div className="expense_details_user_info">
                            <span className="expense_details_user_name">{ower.firstName} {ower.lastName[0]}.</span> owes <span className="expense_details_user_amount">{owerAmount}</span>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ExpenseUserInfo
