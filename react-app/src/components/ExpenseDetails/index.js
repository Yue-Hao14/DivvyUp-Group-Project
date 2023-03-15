import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getMMDDYYYY } from "../../utils/utils";
import EditAndDeleteButtons from "./EditAndDeleteButtons"
import ExpenseUserInfo from "./ExpenseUserInfo";
import './ExpenseDetails.css'

function ExpenseDetails({ expense }) {
    const createdAt = getMMDDYYYY(new Date(expense.createdAt))
    const updatedAt = getMMDDYYYY(new Date(expense.updatedAt))

    return (
            <div className="expense_details_div">
                <div className="expense_details_div_upper">
                    <div className="expense_details_icon"></div>
                    <div className="expense_details_info_div">
                        <div className="expense_details_info_expense_description">{expense.description}</div>
                        <div className="expense_details_info_expense_amount">{expense.amount}</div>
                        <div className="expense_details_info_added_by">{`Added by ${expense.payer.firstName} ${expense.payer.lastName[0]}. on ${createdAt}`}</div>
                        <div className="expense_details_info_last_updated">{`Last updated by ${expense.payer.firstName} ${expense.payer.lastName[0]}. on ${updatedAt}`}</div>
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
