import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addFriendThunk } from "../../store/friends";

function AddFriendModal() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = { email };
        const data = await dispatch(addFriendThunk(request));
        if (data) {
            setErrors(data)
        } else {
            closeModal();
        }

    }

    return (
        <form className="add_friend_modal_form" onSubmit={handleSubmit}>
            <div className="add_friend_modal_form_label_container">
                <div className="add_friend_modal_icon"></div>
                <div className="add_friend_modal_label">Add Friend</div>
            </div>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="search..."
            ></input>
            <button className="add_friend_modal_submit_button">add friend</button>
        </form>
    )
}

export default AddFriendModal
