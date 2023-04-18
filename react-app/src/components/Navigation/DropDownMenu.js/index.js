import { useState, useRef } from "react";
import { useEffect } from "react";
import OpenModalButton from "../../OpenModalButton";
import AddFriendModal from "../../SideBar/AddFriendModal";
import RemoveFriendModal from "../../SideBar/RemoveFriendModal";
import "./DropDownMenu.css"
import { NavLink } from "react-router-dom";

function DropDownMenu() {
    const [showSideBar, setShowSideBar] = useState(false);
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
    const closeSideBar = () => setShowSideBar(false);

    const displayFriends = () => {
      alert("SHOW ME WHAT YOU GOT!")
    }

    return (
      <>
        <button onClick={openSideBar} className='drop_down_menu_button'>
            <i className="fa-solid fa-bars profile_icon" />
        </button>
        <ul className={sideBarClassName} ref={sideBarRef}>
          <>
            <li onClick={closeSideBar}>
              <NavLink activeClassName='active_sidebar_link' exact to="/">Dashboard</NavLink>
            </li>
            <li onClick={closeSideBar}>
              <NavLink to={`/all-expenses`}>All Expenses</NavLink>
            </li>
            <li onClick={closeSideBar}>
            <NavLink to={`/payment-history`}>Payment History</NavLink>
            </li>
            <li onClick={displayFriends}>
              FRIENDS
            </li>
          </>
        </ul>
      </>
    )
}

export default DropDownMenu;
