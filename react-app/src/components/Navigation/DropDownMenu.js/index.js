import { useState, useRef } from "react";
import { useEffect } from "react";
import "./DropDownMenu.css"

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

    return (
      <>
        <button className='drop_down_menu_button'>
            <i className="fa-solid fa-bars profile_icon" />
        </button>
        <ul className={sideBarClassName} ref={sideBarRef}>
          <>
            <li>option</li>
            <li>option</li>
            <li>option</li>
            <li>option</li>
            <li>option</li>
            <li>option</li>
            <li>option</li>
          </>
        </ul>
      </>
    )
}

export default DropDownMenu;
