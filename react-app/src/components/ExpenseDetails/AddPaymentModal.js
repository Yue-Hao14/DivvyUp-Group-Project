import { useState, useEffect } from 'react'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postPaymentThunk } from '../../store/expenses'
import './AddPayment.css'

// TO DO: figure out how to re-render expense details after adding a new payment

function AddPaymentModal({ expenseId, ower, owerAmount }) {
  const dispatch = useDispatch()
  const { closeModal } = useModal()
  const today = new Date().toISOString().split('T')[0]
  // console.log("today", today)

  // set state variables
  const [settledDate, setSettledDate] = useState(today) // can default to today first
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();
    setHasSubmitted(true);

    const payment = {
      owerId: ower.id,
      expenseId,
      settledDate
    }

    await dispatch(postPaymentThunk(payment))
    closeModal()
  }


  return (
    <form className="add_payment_modal_form">
      <div className='add_payment_modal_label_container'>
        Settle Up
      </div>
      <div className='add_payment_modal_ower_payer'>{ower.firstName} paid You</div>
      <div className='add_payment_modal_ower_amount'>{owerAmount}</div>
      <input
        type="date"
        value={settledDate}
        defaultValue={settledDate}
        onChange={e => setSettledDate(e.target.value)}
        required
        className='add_payment_modal_settled_date' />
      <div className='add_payment_modal_buttons_container'>
        <button className='add_payment_modal_buttons_cancel_button' onClick={closeModal}>Cancel</button>
        <button className='add_payment_modal_buttons_submit_button' onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  )
}

export default AddPaymentModal
