import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import AddExpenseModal from '../Navigation/AddExpenseModal'
import LoggedOutSplashPage from '../LoggedOutSplashPage'
import { getAllExpensesThunk } from '../../store/expenses'
import './Splash.css'

function SplashPage () {
    const userExpenses = useSelector(state => state.expenses.allExpenses)
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()

    const expensesArr = Object.values(userExpenses)

    useEffect(() => {
        if (sessionUser) {
        dispatch(getAllExpensesThunk())
        }
    }, [sessionUser])

    if (!sessionUser) return <LoggedOutSplashPage />; // account for if the user logs out on this page

    let userOwed = 0;
    let userDebt = 0;
    let totalBalance = 0;
    let unsettledByUserArr = [];
    let unSettledByOthersArr = [];

    // iterate through each exepense and determine how much user owes and is owed
    for (const expense of expensesArr) {
        const numOwers = expense.owers.length;
        const splitAmount = (expense.amount / (numOwers + 1))

        // If user is payer, they are owed splitAmount * num owers minus (the length of settledOwers * splitAmount)
        if (expense.payer.id === sessionUser.id) {
            // if length of settled owers is less than numOwers
            const numUnsettledOwers = numOwers - expense.settledOwers.length
            if (numUnsettledOwers > 0) {
                userOwed += Number.parseFloat(((splitAmount * numUnsettledOwers).toFixed(2)));
                unSettledByOthersArr.push(expense);
            }
                // find number of users who still owe, multiply the split amount by number of users who still owe
                    // and add to userOwed
        } else {
        // If user is not payer, then they must be an ower
        // If user is an ower, and has not settled their debt, add splitAmount to userDebt
            const userInSettledOwers = expense.settledOwers.find(settledOwerId => settledOwerId.settledUserId === sessionUser.id)
            if (!userInSettledOwers) {
                userDebt += Number.parseFloat(splitAmount.toFixed(2))
                unsettledByUserArr.push(expense)
            }
        }
    }

    totalBalance = userOwed - userDebt

    return (
        <>
            <div className="splash-page-wrapper">
                <div className="splash-page-header-container">
                    <div className="splash-page-header-button" >
                        <h1 className="splash-page-title">Dashboard</h1>
                        <div className="splash-page-button">
                            <OpenModalButton
                                modalComponent={<AddExpenseModal />}
                                buttonText='Add an Expense'
                            />
                        </div>
                    </div>
                </div>
                <div className="splash-page-balance-container">
                    <div className="splash-page-total-balance-container">
                        <div>
                            <h3>Total balance</h3>
                        </div>
                        <div>
                            {totalBalance.toFixed(2)}
                        </div>
                    </div>
                    <div className="splash-page-owe-container">
                        <div>
                            <h3>You owe</h3>
                        </div>
                        <div>
                            {userDebt.toFixed(2)}
                        </div>
                    </div>
                    <div className="splash-page-are-owe-container">
                        <div>
                            <h3>You are owed</h3>
                        </div>
                        <div>
                            {userOwed.toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="splash-page-content-container">
                    <div className="you-owe-details-container">
                        <div>
                            <h2>YOU OWE</h2>
                        </div>
                        <div className="you-owe-list">
                            {unsettledByUserArr.filter(expense => expense.payer.id !== sessionUser.id)
                                .map(expense => {
                                    const owedAmount = expense.amount / (expense.owers.length + 1);
                                    return (
                                        <div key={expense.id}>

                                            <div>
                                                <div>{expense.payer.firstName}</div>
                                                <div> you owe ${owedAmount.toFixed(2)}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className="you-are-owed-details-container">
                            <div>
                                <h2>YOU ARE OWED</h2>
                            </div>
                            <div className="are-owed-you-list">
                                {unSettledByOthersArr.filter(expense => expense.payer.id === sessionUser.id)
                                    .map(expense => {
                                        const amountOwed = expense.amount / (expense.owers.length + 1);
                                        return (
                                            <div key={expense.id}>
                                                {expense.owers.map(ower => (
                                                    <div>
                                                        <div>{ower.firstName}</div>
                                                        <div> owes you ${amountOwed.toFixed(2)}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashPage
