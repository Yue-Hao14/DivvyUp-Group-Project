function ExpenseUserInfo({ expense }) {
    // might have a type issue here with expense.amount (might be string)
    const owerAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2)


    return (
        <div className="expense_details_info_div">
            <div className="expense_details_user_info_div">
                <i className="expense_details_user_icon fa-solid fa-user" />
                <div className="expense_details_user_info">
                    <span className="expense_details_user_name">{`${expense.payer.firstName} ${expense.payer.lastName[0]}.`}</span> paid <span className="expense_details_user_amount">${expense.amount}</span>
                </div>
            </div>
            {expense.owers.map(ower => {
                return (
                    <div key={ower.id} className="expense_details_user_info_div">
                        <i className="expense_details_user_icon fa-solid fa-user" />
                        <div className="expense_details_user_info">
                            <span className="expense_details_user_name">{ower.firstName} {ower.lastName[0]}.</span> owes <span className="expense_details_user_amount">${owerAmount}</span>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ExpenseUserInfo
