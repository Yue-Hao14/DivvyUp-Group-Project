import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getSingleExpenseDetailsThunk } from "../../store/expenses";
import ExpenseInfo from "./ExpenseInfo";
import EditAndDeleteButtons from "./EditAndDeleteButtons"
import ExpenseUserInfo from "./ExpenseInfo";
import './ExpenseDetails.css'

function ExpenseDetails({ expenseId }) {
    const expenseDetails = useSelector(state => state.expenses.currentExpenseDetails)

    return (
            <div className="expense_details_div">
                <div className="expense_details_div_upper">
                    <div className="expense_details_icon"></div>
                    <ExpenseInfo />
                    {/* <EditAndDeleteButtons /> */}
                </div>
                <div className="expense_details_div_lower">
                    {/* <ExpenseUserInfo /> */}
                    <div className="expense_details_comments_div">
                        {/* This is where a comments component will go */}
                    </div>
                </div>
            </div>
    )
}

export default ExpenseDetails
