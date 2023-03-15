import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OpenModalButton from '../OpenModalButton'
import AddExpenseModal from '../Navigation/AddExpenseModal'
import LoggedOutSplashPage from '../LoggedOutSplashPage'
import { getAllExpensesThunk } from '../../store/expenses'
import './Splash.css'

function SplashPage () {
  // const [totalBalance, setTotalBalance] = useState(0);
  // const [totalOwe, setTotalOwe] = useState(0);
  // const [totalOwed, setTotalOwed] = useState(0);

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

    let totalOwed = 0;
    let totalDebt = 0;
    let totalSettled = 0;
    let totalSettledByOthers = 0
    let totalBalance = 0;
    let unsettledArr = [];
    let unSettledByOthersArr = [];

    for (let i = 0; i < expensesArr.length; i++) {
        const expense = expensesArr[i];

        // Check if user is the payer
        if (expense.payer.id === sessionUser.id) {
            const numOwers = expense.owers.length;
            totalOwed += (expense.amount / (numOwers + 1)) * numOwers;
            // console.log("=====================totalOwed:", totalOwed);
        }
        // Check if user is an owner
        if (expense.owers) {
            const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
            if (userOwer) {
                totalDebt += expense.amount / (expense.owers.length + 1);
                // console.log("==============totalDEbt:", totalDebt);
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
                        // console.log("===========totalSettle:", totalSettled);
                    }
                }
                unSettledByOthersArr.push(expense)
            }
        } else {
            unsettledArr.push(expense)
            totalSettledByOthers = (expense.amount / (expense.owers.length + 1)) * expense.settledOwers.length;
            // console.log("=================totalSetteleByOthers:", totalSettledByOthers);
        }
    }

    totalBalance = totalOwed - totalDebt + totalSettled - totalSettledByOthers

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
                            {(totalDebt - totalSettled).toFixed(2)}
                        </div>
                    </div>
                    <div className="splash-page-are-owe-container">
                        <div>
                            <h3>You are owed</h3>
                        </div>
                        <div>
                            {(totalOwed - totalSettledByOthers).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="splash-page-content-container">
                    <div className="you-owe-details-container">
                        <div>
                            <h2>YOU OWE</h2>
                        </div>
                        <div className="you-owe-list">
                            {unsettledArr.filter(expense => expense.payer.id !== sessionUser.id)
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
