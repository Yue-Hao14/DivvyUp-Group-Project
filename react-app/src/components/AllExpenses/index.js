import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TotalBalance from "../TotalBalance";
import { getAllExpensesThunk } from "../../store/expenses"
import ExpenseSummarySection from "../ExpenseSummaries/ExpenseSummarySection";
import ExpenseSummaries from "../ExpenseSummaries";

function AllExpenses() {
    const currentExpenseSummaries = useSelector(state => state.expenses.currentExpenseSummaries)
    const allExpenses = useSelector(state => state.expenses.allExpenses)
    const dispatch = useDispatch();

    // if the current expense summaries slice of state does not equal
    // all expenses slice of state dispatch thunk
    // possibly due to adding a new expense
    // or being on a friend's expense page prior
    if (currentExpenseSummaries !== allExpenses) {
        dispatch(getAllExpensesThunk())
    }

    return (
        <>
            <ExpenseSummaries />
            <TotalBalance />
        </>
    )
}

export default AllExpenses;
