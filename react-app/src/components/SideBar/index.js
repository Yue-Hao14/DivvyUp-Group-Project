import { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllFriendsThunk } from "../../store/friends";

function SideBar() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends)
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
            dispatch(getAllFriendsThunk()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div className="side_bar">
            <div className="side_bar_dashboard">Dashboard</div>
            <div className="side_bar_all_expenses">All Expenses</div>
            <div className="side_bar_friends_label_div">
                <div className="side_bar_friends_label">Friends</div>
                <div className="side_bar_friends_add_button">+ add</div>
            </div>
            <div className="side_bar_friends_list">
                {isLoaded && (
                    Object.values(friends).map(friend => (
                        <div className="side_bar_friend">
                            <NavLink to={`/friends/${friend.id}`}>{`${friend.first_name} ${friend.last_name}`}</NavLink>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SideBar
