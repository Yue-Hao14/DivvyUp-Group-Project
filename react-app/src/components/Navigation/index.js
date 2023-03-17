import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import AddExpenseModal from './AddExpenseModal'
import OpenModalButton from '../OpenModalButton'

import './Navigation.css'

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navigation-container'>
      <NavLink exact to='/' className='navigation-logo'>
        <i className='fa-solid fa-divide' />
        DivvyUp
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
