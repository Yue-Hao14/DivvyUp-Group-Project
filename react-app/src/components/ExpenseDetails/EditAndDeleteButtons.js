import { useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton'
import EditExpenseModal from "./EditExpenseModal"
import DeleteExpenseModal from "./DeleteExpenseModal"



function EditAndDeleteButtons() {
    const expenseDetails = useSelector(state => state.expenses.currentExpenseDetails)
    const sessionUser = useSelector(state => state.session.user)

    /*
        Render the buttons only if the current user is the payer of the expense
        AND there are nobody has settled their expense yet
     */
    if (!expenseDetails || (expenseDetails.payer.id != sessionUser.id) || expenseDetails.settledOwers.length > 0) return null

    return (
        <div className="expense_details_buttons_div">
            {/* OpenModalButtons for each
                Edit should open the same modal as add expense with the details already populated
                Delete should open a confirm delete modal
             */}
            <OpenModalButton
                modalComponent={<EditExpenseModal />}
                buttonText="edit"
            />
            <OpenModalButton
                modalComponent={<DeleteExpenseModal />}
                buttonText={<i className='remove_expense_button fa-solid fa-trash' />}
            />
        </div>
    )
}

export default EditAndDeleteButtons
