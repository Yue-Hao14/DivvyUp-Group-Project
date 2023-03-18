import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postPaymentThunk } from '../../store/expenses'
import './AddPayment.css'


function AddPaymentModal ({ expenseId, ower, owerAmount }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const today = new Date().toISOString().split('T')[0]

  // set state variables
  const [settledDate, setSettledDate] = useState(today)

  const handleSubmit = async e => {
    e.preventDefault()

    const payment = {
      owerId: ower.id,
      expenseId,
      settledDate
    }

    await dispatch(postPaymentThunk(payment))
    closeModal()
  }

  return (
    <form className='add_payment_modal_form'>
      <div className='add_payment_modal_label_container'>
        <i className='fa-solid fa-handshake settled_expenses_icon' />
        <div className='add_payment_modal_title'>Settle Up</div>
      </div>
      <div className='add_payment_modal_ower_payer'>
        {ower.firstName} paid you:
      </div>
      <div className='add_payment_modal_ower_amount'>${owerAmount}</div>
      <input
        type='date'
        value={settledDate}
        onChange={e => setSettledDate(e.target.value)}
        required
        className='add_payment_modal_settled_date'
      />
      <div className='add_payment_modal_buttons_container'>
        <button
          className='add_payment_modal_buttons_cancel_button'
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='add_payment_modal_buttons_submit_button'
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AddPaymentModal
