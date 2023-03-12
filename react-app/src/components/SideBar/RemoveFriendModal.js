import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { removeFriendThunk } from "../../store/friends";

function RemoveFriendModal({ user }) {
    const { closeModal }  = useModal();
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();

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

    return (
        <div className="delete_confirmation_modal_div">
            <h2 className="delete_confirmation_modal_title">Unfriend {`${user.first_name}`}</h2>
            <p className="delete_confirmation_modal_info">Are you sure you want to remove {`${user.first_name} from your friends list?`}</p>
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

export default RemoveFriendModal
