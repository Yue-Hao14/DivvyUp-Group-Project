import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'

function Navigation ({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user)

  return (
    <nav className='navigation-container'>
      <NavLink exact to='/' className='navigation-logo'>
	  <i className="fa-solid fa-money-bill"></i>
	  DivvyUp
      </NavLink>
      {isLoaded && (
        <ul className='navigation-links'>
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navigation
