import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import AddExpenseModal from "../TopBar/AddExpenseModal";
import { getAllExpensesThunk } from "../../store/expenses";


function SplashPage() {
    // const [totalBalance, setTotalBalance] = useState(0);
    // const [totalOwe, setTotalOwe] = useState(0);
    // const [totalOwed, setTotalOwed] = useState(0);

    const userExpenses = useSelector(state => state.expenses.allExpenses);
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()


    const expensesArr = Object.values(userExpenses);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getAllExpensesThunk)
        }
    }, [sessionUser])

            let totalOwed = 0;
            let totalOwe = 0;
            let totalBalance = 0

            for (let i = 0; i < expensesArr.length; i++) {
                const expense = expensesArr[i];
                if (expense.payer.id === sessionUser.id) {
                    const numOwers = expense.owers.length;
                    totalOwed += (expense.amount / (numOwers + 1)) * numOwers;
                } else if (expense.owers) {
                    const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
                    if (userOwer) {
                        totalOwe += expense.amount / expense.owers.length;
                    }
                }
            };
            totalBalance = totalOwed - totalOwe


    // const expensesArr = Object.values(userExpenses);

    // useEffect(() => {
    //     function calculateTotals() {
    //         let newTotalOwed = 0;
    //         let newTotalOwe = 0;

    //         for (let i = 0; i < expensesArr.length; i++) {
    //             const expense = expensesArr[i];
    //             if (expense.payer.id === sessionUser.id) {
    //                 const numOwers = expense.owers.length;
    //                 newTotalOwed += (expense.amount / (numOwers + 1)) * numOwers;
    //             } else if (expense.owers) {
    //                 const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
    //                 if (userOwer) {
    //                     newTotalOwe += expense.amount / expense.owers.length;
    //                 }
    //             }

    //         };

    //         setTotalOwed(newTotalOwed);
    //         setTotalOwe(newTotalOwe);
    //         setTotalBalance(newTotalOwed - newTotalOwe);
    //     }

    //     if (sessionUser) {
    //         dispatch(getAllExpensesThunk()).then(calculateTotals);
    //     }
    // }, [dispatch, sessionUser, expensesArr]);

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
                            {totalOwe.toFixed(2)}
                        </div>
                    </div>
                    <div className="splash-page-are-owe-container">
                        <div>
                            <h3>You are owed</h3>
                        </div>
                        <div>
                            {totalOwed.toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className="splash-page-content-container">
                    <div className="you-owe-details-container">
                        <div>
                            <h2>YOU OWE</h2>
                        </div>
                        <div className="you-owe-list">
                            {expensesArr.filter(expense => expense.payer.id !== sessionUser.id)
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
                                {expensesArr.filter(expense => expense.payer.id === sessionUser.id)
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

export default SplashPage;
