import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { getAllFriendsThunk } from "../../store/friends";
import OpenModalButton from "../OpenModalButton";
import AddFriendModal from "./AddFriendModal";
import RemoveFriendModal from "./RemoveFriendModal";

function SideBar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const friends = useSelector((state) => state.friends)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllFriendsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    if (!sessionUser) return Redirect("/") // Redirect user to home page if they are not logged in

    return (
        <div className="side_bar">
            <div className="side_bar_dashboard">Dashboard</div>
            <div className="side_bar_all_expenses">All Expenses</div>
            <div className="side_bar_friends_label_div">
                <div className="side_bar_friends_label">Friends</div>
                <div className="side_bar_friends_add_button">
                    <OpenModalButton
                        modalComponent={<AddFriendModal />}
                        buttonText="+ add"
                    />
                </div>
            </div>
            <div className="side_bar_friends_list">
                {isLoaded && (
                    Object.values(friends).map(friend => (
                        <div key={friend.id} className="side_bar_friend">
                            <NavLink to={`/friends/${friend.id}`}>{`${friend.first_name} ${friend.last_name}`}</NavLink>
                            <OpenModalButton
                                modalComponent={<RemoveFriendModal />}
                                buttonText={<i className="remove_friend_button fa-solid fa-trash" />}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SideBar
