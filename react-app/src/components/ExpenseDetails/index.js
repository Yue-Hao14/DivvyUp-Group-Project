import { useDispatch } from "react-redux"

function ExpenseDetails(expenseId) {
    // dispatch thunk to get spot details added to store
    const dispatch = useDispatch();

    // check to make sure there is a logged in user and that the
    // expense is in all of their expenses
    return (
        null
    )
}

export default ExpenseDetails
