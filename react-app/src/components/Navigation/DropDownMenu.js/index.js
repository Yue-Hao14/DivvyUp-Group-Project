import { useState, useRef } from "react";
import { useEffect } from "react";
import OpenModalButton from "../../OpenModalButton";
import AddFriendModal from "../../SideBar/AddFriendModal";
import RemoveFriendModal from "../../SideBar/RemoveFriendModal";
import AddExpenseModal from "../AddExpenseModal";
import "./DropDownMenu.css"
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function DropDownMenu() {
    const [showSideBar, setShowSideBar] = useState(false);
    const [showFriends, setShowFriends] = useState(false);
    const friends = useSelector(state => Object.values(state.friends));
    const sideBarRef = useRef();

    const openSideBar = () => {
      if (showSideBar) return;
      setShowSideBar(true);
    }

    useEffect(() => {
      if (!showSideBar) return;

      const closeSideBar = (e) => {
        if (!sideBarRef.current.contains(e.target)) {
          setShowSideBar(false);
        }
      }

      document.addEventListener("click", closeSideBar);

      return () => document.removeEventListener("click", closeSideBar);
    }, [showSideBar])

    const sideBarClassName = "sidebar-dropdown" + (showSideBar ? "" : " hidden");
    const friendsListClassName = "dropdown-friends-list-container" + (showFriends ? "" : " hidden")
    const closeSideBar = () => setShowSideBar(false);

    const toggleFriends = () => {
      setShowFriends(!showFriends)
    }

    return (
      <>
        <button onClick={openSideBar} className='drop_down_menu_button'>
            <i className="fa-solid fa-bars profile_icon" />
        </button>
        <ul className={sideBarClassName} ref={sideBarRef}>
          <>
            <div className="dropdown_add_expense_button">
              <OpenModalButton
              modalComponent={<AddExpenseModal />}
              buttonText='Add an Expense'
              />
            </div>
            <li onClick={closeSideBar}>
              <NavLink activeClassName='active_sidebar_link' exact to="/">Dashboard</NavLink>
            </li>
            <li onClick={closeSideBar}>
              <NavLink activeClassName='active_sidebar_link' to={`/all-expenses`}>All Expenses</NavLink>
            </li>
            <li onClick={closeSideBar}>
              <NavLink activeClassName='active_sidebar_link' to={`/payment-history`}>Payment History</NavLink>
            </li>
            <li className="dropdown-friends-toggle-container" onClick={toggleFriends}>
              {showFriends ? (
                <div className="dropdown-friends-label display-friends-label">Friends <span className="friends_arrow">&#x25BE;</span></div>
              ) : (
                <div className="dropdown-friends-label">Friends <span className="friends_arrow">&#x25B8;</span></div>
              )}
              <div className='side_bar_friends_add_button side_bar_friends_dropdown_add_button'>
                <OpenModalButton
                  modalComponent={<AddFriendModal />}
                  className='fa-solid fa-user-plus'
                />
              </div>
            </li>
            <div className={friendsListClassName}>
              {friends.map((friend) => (
                <div key={friend.id} className="side_bar_dropdown_friends_list">
                  <NavLink onClick={closeSideBar} to={`/friends/${friend.id}`} activeClassName="active_sidebar_link">
                    {`${friend.firstName} ${friend.lastName}`}
                  </NavLink>
                  <OpenModalButton
                    modalComponent={<RemoveFriendModal user={friend} />}
                    buttonText={
                      <i className='dropdown_remove_friend_button fa-solid fa-trash' />
                    }
                  />
                </div>
              ))}
            </div>
          </>
        </ul>
      </>
    )
}

export default DropDownMenu;
