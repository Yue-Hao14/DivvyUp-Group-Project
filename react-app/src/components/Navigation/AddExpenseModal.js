import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postExpenseThunk } from '../../store/expenses'
import './AddExpenseModal.css'

function AddExpenseModal () {
  const today = new Date().toISOString().split('T')[0]
  const [owerIds, setOwerIds] = useState([])
  const [description, setDescription] = useState('')
  let [amount, setAmount] = useState(0)
  const [splitAmount, setSplitAmount] = useState(0)
  const [expenseDate, setExpenseDate] = useState(today)
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const friends = useSelector(state => state.friends)
  const sessionUser = useSelector(state => state.session.user)

  // create an array of friendsId to for SELECT element
  const friends_array = Object.values(friends)

  let friends_options = []
  friends_array.forEach(friend => {
    const value = friend.id
    const label = friend.firstName + ' ' + friend.lastName
    const friend_obj = {
      value,
      label
    }
    friends_options.push(friend_obj)
  })

  // error validations
  useEffect(() => {
    let e = {}
    if (!owerIds.length > 0) e.emptyOwerIds = 'Ower is required'
    if (!description.length > 0) e.emptyDescription = 'Description is required'
    if (!amount.length > 0) e.emptyAmount = 'Amount is required'
    if (amount <= 0) e.invalidAmount = "Amount must be a positive number"
    if (!expenseDate.length > 0) e.emptyExpenseDate = 'Expense date is required'
    setErrors(e)
  }, [owerIds, description, amount, expenseDate])

  // calculate splitAmount every time when amount and/or owerIds change
  useEffect(() => {
    const calculatedSplitAmount = (amount / (owerIds.length + 1)).toFixed(2)
    setSplitAmount(calculatedSplitAmount)
  }, [amount, owerIds])

  const handleSubmit = async e => {
    e.preventDefault()
    setHasSubmitted(true)

    // make sure amount only has 2 decimal points
    amount = parseFloat(amount).toFixed(2)

    const newExpense = { owerIds, description, amount, expenseDate }

    // if no error, we POST the newExpense to db via thunk
    if (Object.values(errors).length === 0) {
      const data = await dispatch(postExpenseThunk(newExpense))
      if (data) {
        setErrors(data)
      } else {
        closeModal()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='add_expense_modal_form'>
      <div className='add_expense_modal_label_container'>Add an Expense</div>
      <div className='add_expense_modal_payer_and_owers_container'>
        <div className='add_expense_modal_payer_text'>With you and: </div>
        <Select
          className='add_expense_modal_owers'
          isMulti
          options={friends_options}
          onChange={e => {
            let temp_owers_arr = []
            e.forEach(ower => {
              temp_owers_arr.push(ower.value)
            })
            setOwerIds(temp_owers_arr)
          }}
        />
        {hasSubmitted && errors.emptyOwerIds && (
          <div className='error'>{errors.emptyOwerIds}</div>
        )}
      </div>
      <div className='add_expense_modal_upper_middle_container'>
        <div className='add_expense_modal_icon'>
          <i className='fa-solid fa-dollar-sign' />
        </div>
        <div className='add_expense_modal_upper_middle_right_container'>
          <input
            type='text'
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder='Enter a description'
            className='add_expense_modal_description'
          />
          {hasSubmitted && errors.emptyDescription && (
            <div className='error'>{errors.emptyDescription}</div>
          )}
          <input
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            placeholder='amount'
            className='add_expense_modal_amount'
          />
          {hasSubmitted && errors.emptyAmount && (
            <div className='error'>{errors.emptyAmount}</div>
          )}
          {hasSubmitted && errors.invalidAmount && (
            <div className='error'>{errors.invalidAmount}</div>
          )}
        </div>
      </div>
      <div className='add_expense_modal_lower_middle_container'>
        <div className='add_expense_modal_payer_split_method'>
          Paid by {sessionUser.firstName} and split evenly.
        </div>
        <div className='add_expense_modal_cost_per_person'>
          ($ {splitAmount} / person)
        </div>
        <div>
          <input
            type='date'
            value={expenseDate}
            onChange={e => setExpenseDate(e.target.value)}
            required
            className='add_expense_modal_expense_date'
          />
          {hasSubmitted && errors.emptyExpenseDate && (
            <div className='error'>{errors.emptyExpenseDate}</div>
          )}
        </div>
      </div>
      <div className='add_expense_modal_bottom_container'>
        <button
          type='button'
          className='add_expense_modal_cancel_button'
          onClick={closeModal}
        >
          Cancel
        </button>
        <button type='submit' className='add_expense_modal_submit_button'>
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddExpenseModal
