import { useEffect } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getAllFriendsThunk } from '../../store/friends'
import OpenModalButton from '../OpenModalButton'
import AddFriendModal from './AddFriendModal'
import RemoveFriendModal from './RemoveFriendModal'

import './SideBar.css'

function SideBar () {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const friends = useSelector(state => state.friends)

  useEffect(() => {
    if (sessionUser) {
      dispatch(getAllFriendsThunk());
    }
  }, [dispatch, sessionUser]);

  if (!sessionUser) return null // Do not display sidebar if user is not logged in

  return (
    <div className='side_bar'>
      <div className='side_bar_dashboard'>
        <NavLink activeClassName='active_sidebar_link' exact to={`/`}>Dashboard</NavLink>
      </div>
      <div className='side_bar_all_expenses'>
        <NavLink activeClassName='active_sidebar_link' to={`/all-expenses`}>All Expenses</NavLink>
      </div>
      <div className='side_bar_all_expenses'>
        <NavLink activeClassName='active_sidebar_link' to={`/payment-history`}>Payment History</NavLink>
      </div>
      <div className='side_bar_friends_label_div'>
        <div className='side_bar_friends_label'>
          FRIENDS
          <div className='side_bar_friends_add_button'>
            <OpenModalButton
              modalComponent={<AddFriendModal />}
              buttonText='+ add'
            />
          </div>
        </div>
      </div>
      <div className='side_bar_friends_list'>
        {Object.values(friends).map(friend => (
            <div key={friend.id} className='side_bar_friend'>
              <NavLink activeClassName='active_sidebar_link'
                to={`/friends/${friend.id}`}
              >{`${friend.firstName} ${friend.lastName}`}</NavLink>
              <div className='remove_friend_button_container'>
                <OpenModalButton
                  modalComponent={<RemoveFriendModal user={friend} />}
                  buttonText={
                    <i className='remove_friend_button fa-solid fa-trash' />
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SideBar
