import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import EditAndDeleteButtons from "./EditAndDeleteButtons"
import ExpenseUserInfo from "./ExpenseUserInfo";
import './ExpenseDetails.css'

function ExpenseDetails({ expense }) {
    return (
            <div className="expense_details_div">
                <div className="expense_details_div_upper">
                    <div className="expense_details_icon"></div>
                    <div className="expense_details_info_div">
                        <div className="expense_details_info_expense_description">{expense.description}</div>
                        <div className="expense_details_info_expense_amount">{expense.amount}</div>
                        <div className="expense_details_info_added_by">{`Added by ${expense.payer.firstName} ${expense.payer.lastName[0]}. on ${expense.createdAt}`}</div>
                        <div className="expense_details_info_last_updated">{`Last updated by ${expense.payer.firstName} ${expense.payer.lastName[0]}. on ${expense.updatedAt}`}</div>
                    </div>
                    <EditAndDeleteButtons expense={expense} />
                </div>
                <div className="expense_details_div_lower">
                    <ExpenseUserInfo expense={expense} />
                    <div className="expense_details_comments_div">
                        {/* This is where a comments component will go */}
                    </div>
                </div>
            </div>
    )
}

export default ExpenseDetails
