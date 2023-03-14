import { useEffect, useState } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { getAllFriendsThunk } from '../../store/friends'
import OpenModalButton from '../OpenModalButton'
import AddExpenseModal from './AddExpenseModal'
import './TopBar.css'


function TopBar() {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!sessionUser) return null // Do not display sidebar if user is not logged in

  return (
    <div className="top_bar">
      <div className="top_bar_add_an_expense_button">
        <OpenModalButton
          modalComponent={<AddExpenseModal />}
          buttonText='Add an Expense'
        />
      </div>
    </div>
  )
}


export default TopBar
