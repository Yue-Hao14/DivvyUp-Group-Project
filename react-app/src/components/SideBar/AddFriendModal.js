import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { addFriendThunk } from '../../store/friends'
import './AddFriendModal.css'

function AddFriendModal () {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const { closeModal } = useModal()

  const handleSubmit = async e => {
    e.preventDefault()
    const request = { email }
    const data = await dispatch(addFriendThunk(request))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  }

  return (
    <form className='add_friend_modal_form' onSubmit={handleSubmit}>
      <div className='add_friend_modal_form_label_container'>
        <div className='add_friend_modal_label'>
          <i className='fas a-solid fa-divide add_friend_modal_icon'></i>
          <span className='add_friend_modal_label_text'>Add Friend</span>
        </div>
      </div>
      <ul className='add_friend_modal_error_list'>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <input
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        placeholder='enter user email...'
        className='add_friend_modal_input'
      />
      <div className='button_container'>
        <button
          type='button'
          onClick={closeModal}
          className='add_friend_modal_cancel_button'
        >
          Cancel
        </button>
        <button type='submit' className='add_friend_modal_submit_button'>Add Friend</button>
      </div>
    </form>
  )
}

export default AddFriendModal
