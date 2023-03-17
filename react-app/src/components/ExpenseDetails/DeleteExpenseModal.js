import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { deleteExpenseThunk } from "../../store/expenses";

function DeleteExpenseModal({ expense }) {
    const { closeModal }  = useModal();
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

    const confirmDelete = async () => {
        // dispatch remove friend thunk
        const data = await dispatch(deleteExpenseThunk(expense.id))
        if (data) {
            // if there were any errors display them although there shouldn't be
            setErrors(data);
        } else {
            // if successful close modal
            closeModal()
        }
    }


    return (
        <div className="delete_confirmation_modal_div">
            <h2 className="delete_confirmation_modal_title">Delete Expense</h2>
            <p className="delete_confirmation_modal_info">Are you sure you want to delete this expense? This will completely remove this expense for ALL people involved, not just you.</p>
            <ul className="delete_confirmation_modal_errors_list">
                {errors.map((error,idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="delete_confirmation_modal_button_container">
                <button onClick={closeModal} className="delete_confirmation_modal_cancel_button">Cancel</button>
                <button onClick={confirmDelete} className="delete_confirmation_modal_confirm_button">Delete</button>
            </div>
        </div>
    )
}

export default DeleteExpenseModal
