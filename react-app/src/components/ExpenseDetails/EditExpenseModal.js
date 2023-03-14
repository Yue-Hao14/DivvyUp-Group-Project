import { useState, useEffect } from 'react'
import Select from "react-select"
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'
import { postExpenseThunk } from '../../store/expenses'

function EditExpenseModal() {
  const dispatch = useDispatch();

  // get expense details from redux store
  const expenseDetails = useSelector((store) => store.currentExpenseDetails);

  // get sessionUser to confirm current user is the payer,
  // if not render error message and ok button
  // return EditExpenseModal with pre-filled expense detail info

}

export default EditExpenseModal
