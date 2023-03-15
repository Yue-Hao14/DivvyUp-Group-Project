import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import AddExpenseModal from '../Navigation/AddExpenseModal'
import LoggedOutSplashPage from '../LoggedOutSplashPage'
import { getAllExpensesThunk } from '../../store/expenses'
import './Splash.css'
import OweYou from './oweYou'

function SplashPage() {
    // const [totalBalance, setTotalBalance] = useState(0);
    // const [totalOwe, setTotalOwe] = useState(0);
    // const [totalOwed, setTotalOwed] = useState(0);

    const userExpenses = useSelector(state => state.expenses.allExpenses)
    const sessionUser = useSelector(state => state.session.user)
    const friendsObj = useSelector(state => state.friends)
    const friends = Object.values(friendsObj)
    const dispatch = useDispatch()

    const expensesArr = Object.values(userExpenses)
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
            const numOwers = expense.owers.length;
            totalOwed += (expense.amount / (numOwers + 1)) * numOwers;
        }
        // Check if user is an owner
        if (expense.owers) {
            const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
            if (userOwer) {
                totalDebt += expense.amount / (expense.owers.length + 1);
            }
        }

        // Check if user is a settler
        if (expense.settledOwers) {
            for (let j = 0; j < expense.settledOwers.length; j++) {
                const settledOwer = expense.settledOwers[j];
                for (let k = 0; k < settledOwer.settledUser.length; k++) {
                    const settledUser = settledOwer.settledUser[k];
                    if (settledUser.id === sessionUser.id) {
                        totalSettled += expense.amount / (expense.owers.length + 1);
                    } else {
                        unSettledByOthersArr.push(expense)
                    }
                }
            }
        } else {
            unsettledArr.push(expense)
            totalSettledByOthers = (expense.amount / (expense.owers.length + 1)) * expense.settledOwers.length;
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
                            {/* {friends.map(friend => {
                                <OweYou friend={friend} />
                            })} */}
                        </div>
                        <div className="you-are-owed-details-container">
                            <div>
                                <h2>YOU ARE OWED</h2>
                            </div>
                            <div className="are-owed-you-list">
                                <div className="you-owe-list">
                                    {friends.map((friend) => (
                                        <OweYou friend={friend} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplashPage
