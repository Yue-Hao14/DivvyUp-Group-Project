import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal"
import { removeFriendThunk } from "../../store/friends";

import "./RemoveFriendModal.css"
function RemoveFriendModal({ user }) {
    const { closeModal } = useModal();
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const sessionUserId = useSelector(state => state.session.user.id)
    const friendId = user.id
    const allExpensesArr = Object.values(useSelector(state => state.expenses.currentExpenseSummaries))
    // console.log("sessionUserId",sessionUserId)

    const confirmDelete = async () => {
        // dispatch remove friend thunk
        const data = await dispatch(removeFriendThunk(user.id))
        if (data) {
            // if there were any errors display them although there shouldn't be
            setErrors(data);
        } else {
            // if successful close modal
            closeModal()
        }
    }

    // check if there is still outstanding expense between user and this friend
    let pendingExpense = true
    for (let i = 0; i < allExpensesArr.length; i++) {
        const expenseObj = allExpensesArr[i]
        const payerId = expenseObj.payer.id
        // console.log("payerId", payerId)
        // console.log("friendId", friendId)
        // console.log(expenseObj)

        // gather owerIds
        const owersArr = expenseObj.owers
        let owerIds = owersArr.map(ower => ower.id)
        // console.log("owerIds", owerIds)

        // gather settled owerId into an array
        const settledOwersArr = expenseObj.settledOwers
        let settledOwersIds
        if (settledOwersArr.length > 0) {
            settledOwersIds = settledOwersArr.map(settledOwer => settledOwer.settledUserId)
        }
        // console.log("settledOwersIds", settledOwersIds)
        // if user is payer, then check if friend is in OwerIds, if yes, then check if friend is in settledOwers, if not break
        if (payerId === sessionUserId && owerIds.includes(friendId) && (settledOwersIds || !settledOwersIds.includes(friendId))) break
        // else if user is not payer, then check if user is in settledOwers, if not break
        else if (payerId !== sessionUserId && settledOwersIds && !settledOwersIds.includes(sessionUserId)) break
        // else set pendingExpense = false
        else pendingExpense = false
    }

    // console.log("boolean", pendingExpense)



    return (
        <div className="delete_confirmation_modal_div">
            <h2 className="delete_confirmation_modal_title">Unfriend {`${user.firstName}`}</h2>
            {!pendingExpense &&
                <p className="delete_confirmation_modal_info">Are you sure you want to remove {`${user.firstName} from your friends list?`}</p>
            }
            {pendingExpense &&
                <p className="delete_confirmation_modal_info"> Unfortunately, you cannot remove {`${user.firstName} from your friends list as there are still pending expenses between you two.`} </p>
            }
            <ul className="delete_confirmation_modal_errors_list">
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="delete_confirmation_modal_button_container">
                <button onClick={closeModal} className="delete_confirmation_modal_cancel_button">Cancel</button>
                {!pendingExpense &&
                    <button onClick={confirmDelete} className="delete_confirmation_modal_confirm_button">Delete</button>
                }
            </div>
        </div>
    )
}

export default RemoveFriendModal
