import { useState, useEffect } from 'react'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { updateExpenseThunk } from '../../store/expenses'

function EditExpenseModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal()

  // get expense details from redux store
  const expenseDetails = useSelector((store) => store.currentExpenseDetails);
  // extract owerIds from expense details
  const current_owers = expenseDetails.owers
  let current_owerIds = []
  current_owers.forEach(ower => {
    current_owerIds.push(ower.id)
  });

  // calculate current splitAmount
  const calculatedSplitAmount = (expenseDetails.amount / (current_owerIds.length + 1)).toFixed(2)

  // set expense details to state variables
  const [owerIds, setOwerIds] = useState(expenseDetails ? current_owerIds : [])
  const [description, setDescription] = useState(expenseDetails ? expenseDetails.description : "")
  const [amount, setAmount] = useState(expenseDetails ? expenseDetails.amount : 0)
  const [splitAmount, setSplitAmount] = useState(expenseDetails ? calculatedSplitAmount : 0)
  const [expenseDate, setExpenseDate] = useState(expenseDetails ? expenseDetails.expenseDate : "")
  const [errors, setErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  // error validations
  useEffect(() => {
    let e = {};
    if (!owerIds.length > 0) e.emptyOwerIds = "Ower is required"
    if (!description.length > 0) e.emptyDescription = "Description is required"
    if (!amount.length > 0) e.emptyAmount = "Amount is required"
    if (!expenseDate.length > 0) e.emptyExpenseDate = "Expense date is required"
    setErrors(e)
  }, [owerIds, description, amount, expenseDate])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    // make sure amount only has 2 decimal points
    amount = amount.toFixed(2)

    const updatedExpense = { owerIds, description, amount, expenseDate, errors }
    // console.log(updatedExpense)

    // if no error, we PUT the updatedExpense to db via thunk
    if (Object.values(errors).length === 0) {
      const data = await dispatch(updateExpenseThunk(updatedExpense))
      closeModal()
    }
  }

  // get sessionUser to confirm current user is the payer,
  // if not render error message and ok button
  const sessionUser = useSelector(state => state.session.user)
  const payerId = expenseDetails.payer.id
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
        Add an expense
      </div>
      <div className='add_expense_modal_payer_and_owers_container'>
        <div className='add_expense_modal_payer_text'>With you and: </div>
        <Select
          className="add_expense_modal_owers"
          isMulti
          options={friends_options}
          onChange={e => {
            console.log('e:', e)
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
        <button className='add_expense_modal_cancel_button' onClick={closeModal}>Cancel</button>
        <button className='add_expense_modal_submit_button' onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}

export default EditExpenseModal
