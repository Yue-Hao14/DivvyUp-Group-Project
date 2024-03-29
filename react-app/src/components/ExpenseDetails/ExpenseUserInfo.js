import { useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import AddPaymentModal from './AddPaymentModal'
import { useParams } from 'react-router-dom'


function ExpenseUserInfo({ expense }) {
    // might have a type issue here with expense.amount (might be string)
    const owerAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2)
    const sessionUser = useSelector(state => state.session.user)
    const settledOwers = expense.settledOwers
    const settledOwerIds = settledOwers.map(settledOwer => settledOwer.settledUserId)
    const { friendId } = useParams()

    return (
        <div className="expense_details_info_div">
            <div className="expense_details_user_info_div">
                <i className="expense_details_user_icon fa-solid fa-user" />
                <div className="expense_details_user_info">
                    <span className="expense_details_user_name">{`${expense.payer.firstName} ${expense.payer.lastName[0]}.`}</span> paid <span className="expense_details_user_amount">${expense.amount.toFixed(2)}</span>
                </div>
            </div>
            {expense.owers.map(ower => {
                // can do some logic here to add a class name to the div to show if expense is settled or not
                return (
                    <div key={ower.id} className="expense_details_user_info_div">
                        <i className="expense_details_user_icon fa-solid fa-user" />
                        <div className="expense_details_user_info">
                            <span className="expense_details_user_name">{ower.firstName} {ower.lastName[0]}.</span> owes <span className="expense_details_user_amount">${owerAmount}</span>
                            {sessionUser.id === expense.payer.id &&
                                !settledOwerIds.includes(ower.id) &&
                                <OpenModalButton
                                    modalComponent={<AddPaymentModal expenseId={expense.id} ower={ower} owerAmount={owerAmount} friendId={friendId} />}
                                    buttonText="Settle Up"
                                    className="settle_up_button"
                                />
                            }
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default ExpenseUserInfo
