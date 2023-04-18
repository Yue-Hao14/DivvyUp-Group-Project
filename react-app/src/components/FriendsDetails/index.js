import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { getAllExpensesThunk, getFriendExpensesThunk } from '../../store/expenses'
import ExpenseSummaries from '../ExpenseSummaries'
import TotalBalance from '../TotalBalance'
import './FriendsDetails.css'
import Loading from '../Loading'

function FriendDetails () {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false)
  const { friendId } = useParams()
  const friend = useSelector(state => state.friends[friendId])

  // dispatch getFriendExpenses thunk on load, or when we switch friend pages
  useEffect(() => {
    setIsLoaded(false)
    dispatch(getAllExpensesThunk())
      .then(() => dispatch(getFriendExpensesThunk(friendId)))
      .then(() => setIsLoaded(true))
  }, [dispatch, friendId])

  if (!sessionUser || (isLoaded && !friend)) return Redirect('/') // redirect to dashboard if the user is not in the current_user's friends list or there is no logged in user

  return (
    <>
      {isLoaded ? (
          <div className='friend_details_div main_content'>
            <section className='friend_details_info_div'>
              <div className='friend_details_user_info_div'>
                <i className='expense_details_user_icon fa-solid fa-user' />
                <div className='friend_details_user_info'>
                  {friend.firstName} {friend.lastName}
                </div>
              </div>
            </section>
            <section className='friend_total_balance_div'>
              <TotalBalance />
            </section>
            <section className='friend_details_expense_summaries_div'>
              <ExpenseSummaries />
            </section>
          </div>
        )
        : <Loading />
      }
    </>
  )
}

export default FriendDetails
