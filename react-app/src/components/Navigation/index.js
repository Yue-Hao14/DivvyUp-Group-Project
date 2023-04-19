import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import AddExpenseModal from './AddExpenseModal'
import OpenModalButton from '../OpenModalButton'
import SideBar from '../SideBar'

import './Navigation.css'
import DropDownMenu from './DropDownMenu.js'

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navigation-container'>
      {isLoaded && sessionUser && (
        <>
          <DropDownMenu />
        </>
      )}
      <NavLink exact to='/' className='navigation-logo'>
        <i className='fa-solid fa-divide navlogodivide' />
        <span>DivvyUp</span>
      </NavLink>
      {isLoaded && (
        <ul className='navigation-links'>
          <div className='navigation-add-expense-button'>
          {sessionUser && (
            <OpenModalButton
              modalComponent={<AddExpenseModal />}
              buttonText='Add an Expense'
            />
          )}
          </div>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navigation
