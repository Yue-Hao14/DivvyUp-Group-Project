import { useState, useEffect } from 'react'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateExpenseThunk } from '../../store/expenses'


function EditExpenseModal({ expense }) {
  const today = new Date().toISOString().split('T')[0]
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  // get expense details from redux store
  const current_owers = expense.owers
  let current_owerIds = current_owers.map(ower => ower.id)
  // // extract owerIds from expense details
  // current_owers.forEach(ower => {
  //   current_owerIds.push(ower.id)
  // });

  // calculate old splitAmount
  let calculatedSplitAmount = (expense.amount / (current_owerIds.length + 1)).toFixed(2)

  // set expense details to state variables
  const [owerIds, setOwerIds] = useState(expense ? current_owerIds : [])
  const [description, setDescription] = useState(expense ? expense.description : "")
  let [amount, setAmount] = useState(expense ? expense.amount.toString() : "")
  const [splitAmount, setSplitAmount] = useState(expense ? calculatedSplitAmount : 0)
  const [expenseDate, setExpenseDate] = useState(expense ? new Date(expense.expenseDate).toISOString().split('T')[0] : today)
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)


  // calculate current splitAmount based on changes in the form
  useEffect(() => {
    const newSplitAmount = (amount / (owerIds.length + 1)).toFixed(2)
    setSplitAmount(newSplitAmount)
  }, [amount, owerIds])

  // create an array of friendsId to for SELECT element
  const friends = useSelector(state => state.friends)
  const friends_array = Object.values(friends)
  let friends_options = []
  friends_array.forEach(friend => {
    const value = friend.id
    const label = friend.firstName + " " + friend.lastName
    const friend_obj = {
      value,
      label
    }
    friends_options.push(friend_obj)
  });

  // create an array of current ower to set default value of the SELECT element
  let owerIdsNames = [];
  current_owers.forEach(ower => {
    const owerIdName = {
      value: ower.id,
      label: ower.firstName + " " + ower.lastName
    }
    owerIdsNames.push(owerIdName)
  });

  // error validations
  useEffect(() => {
    let e = {};
    if (!owerIds.length > 0) e.emptyOwerIds = "Ower is required"
    if (!description.length > 0) e.emptyDescription = "Description is required"
    if (!amount.length > 0) e.emptyAmount = "Amount is required"
    if (amount <= 0) e.invalidAmount = "Amount must be a positive number"
    if (!expenseDate.length > 0) e.emptyExpenseDate = "Expense date is required"
    setErrors(e)
  }, [owerIds, description, amount, expenseDate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // make sure amount only has 2 decimal points
    amount = parseFloat(amount).toFixed(2)

    const id = expense.id

    const updatedExpense = { id, owerIds, description, amount, expenseDate }

    // if no error, we PUT the updatedExpense to db via thunk
    if (Object.values(errors).length === 0) {
      const data = await dispatch(updateExpenseThunk(updatedExpense))
      if (data) {
        setErrors(data)
      } else {
        closeModal()
      }
    }
  }

  // get sessionUser to confirm current user is the payer,
  // if not render error message and ok button
  const sessionUser = useSelector(state => state.session.user)
  const payerId = expense.payer.id
  if (sessionUser.id !== payerId) {
    return (
      <>
        <div>Unfortunately, you do not have permission to edit this expense :(</div>
        <button onClick={closeModal()}>ok</button>
      </>
    )
  }

  // return EditExpenseModal with pre-filled expense detail info

  return (
    <form
      className="add_expense_modal_form">
      <div className='add_expense_modal_label_container'>
        Edit the Expense
      </div>
      <div className='add_expense_modal_payer_and_owers_container'>
        <div className='add_expense_modal_payer_text'>With you and: </div>
        <Select
          className="add_expense_modal_owers"
          isMulti
          options={friends_options}
          defaultValue={owerIdsNames}
          onChange={e => {
            let temp_owers_arr = []
            e.forEach(ower => {
              temp_owers_arr.push(ower.value)
            });
            setOwerIds(temp_owers_arr)
          }
          }
        />
        {hasSubmitted &&
          errors.emptyOwerIds &&
          (<div className='error'>{errors.emptyOwerIds}</div>)}
      </div>
      <div className='add_expense_modal_upper_middle_container'>
        <div className='add_expense_modal_icon'>
          <i className="fa-solid fa-dollar-sign" />
        </div>
        <div className='add_expense_modal_upper_middle_right_container'>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            placeholder='description'
            className='add_expense_modal_description' />
          {hasSubmitted &&
            errors.emptyDescription &&
            (<div className='error'>{errors.emptyDescription}</div>)}
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
            placeholder='amount'
            className='add_expense_modal_amount' />
          {hasSubmitted &&
            errors.emptyAmount &&
            (<div className='error'>{errors.emptyAmount}</div>)}
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
        <input
          type="date"
          value={expenseDate}
          onChange={e => setExpenseDate(e.target.value)}
          required
          className='add_expense_modal_expense_date' />
        {hasSubmitted &&
          errors.emptyExpenseDate &&
          (<div className='error'>{errors.emptyExpenseDate}</div>)}
      </div>
      <div className='add_expense_modal_bottom_container'>
        <button type="button" className='add_expense_modal_cancel_button' onClick={closeModal}>Cancel</button>
        <button type='submit' className='add_expense_modal_submit_button' onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}

export default EditExpenseModal
