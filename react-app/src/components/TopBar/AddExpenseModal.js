import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postExpenseThunk } from '../../store/expenses'
import './AddExpenseModal.css'

// TO DO: figure out how to add owerIds to the Array
// TO DO: figure out how to calculate cost/person

function AddExpenseModal() {
  const [owerIds, setOwerIds] = useState([])
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState(0)
  const [expenseDate, setExpenseDate] = useState("")
  const [errors, setErrors] = useState([])

  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const friends = useSelector(state => state.friends)
  const sessionUser = useSelector(state => state.session.user)

  const today = new Date()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const request = { owerIds, description, amount, expenseDate, errors }
    const data = await dispatch(postExpenseThunk(request))
    if (data) {
      setErrors(data)
    } else {
      closeModal()
    }
  }

  return (
    <form
      className="add_expense_modal_form">
      <div className='add_expense_modal_label_container'>
        Add an expense
      </div>
      <ul className="add_epense_modal_error_list">
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className='add_expense_modal_payer_and_owers_container'>
        <div className='add_expense_modal_payer_text'>With you and: </div>
        <select
        className="add_expense_modal_owers"
        multiple="true"
        size="4"
        value={owerIds}
        onChange={ e => setOwerIds(e.target.value)}>
          <optgroup label="Select Following Friends">
            {Object.values(friends).map(friend => (
              <option value={friend.id}>{friend.firstName} {friend.lastName}</option>
            ))
            }
          </optgroup>
        </select >
        <div className='add_expense_modal_upper_middle_container'>
          <div className='add_expense_modal_icon'>Icon</div>
          <div className='add_expense_modal_upper_middle_right_container'>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              placeholder='description'
              className='add_expense_modal_description' />
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              placeholder='amount'
              className='add_expense_modal_amount' />
          </div>
        </div>
        <div className='add_expense_modal_lower_middle_container'>
          <div className='add_expense_modal_payer_split_method'>
            Paid by {sessionUser.firstName} and split evenly.
          </div>
          <div className='add_expense_modal_cost_per_person'>
            ($ cost to be js/person)
          </div>
          <input
            type="date"
            value="expenseDate"
            onChange={e => setExpenseDate(e.target.value)}
            required
            placeholder='today'
            className='add_expense_modal_expense_date' />
        </div>
        <div className='add_expense_modal_bottom_container'>
          <button className='add_expense_modal_cancel_button' onClick={closeModal}>Cancel</button>
          <button className='add_expense_modal_submit_button' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </form>
  )

}

export default AddExpenseModal
