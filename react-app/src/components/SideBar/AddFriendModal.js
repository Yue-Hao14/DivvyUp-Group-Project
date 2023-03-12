import { useState } from "react";
import { useModal } from "../../context/Modal";

function AddFriendModal() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        // will dispach here and validate form before hand
    }

    return (
        <form className="add_friend_modal_form" onSubmit={handleSubmit}>
            <div className="add_friend_modal_form_label_container">
                <div className="add_friend_modal_icon"></div>
                <div className="add_friend_modal_label">Add Friend</div>
            </div>
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
