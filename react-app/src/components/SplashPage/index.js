import { useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton'

function SplashPage() {
    const userExpenses = useSelector(state => state.expenses.allExpenses)
    const sessionUser = useSelector(state => state.session.user)

    let totalBalance = 0;

    const expensesArr = Object.values(userExpenses);

    for (let i = 0; i < expensesArr.length; i++) {
        const expense = expensesArr[i];

        const userOwer = expense.owers.find(ower => ower.id === sessionUser.id);
        if (userOwer) {
            totalBalance += expense.amount / (expense.owers.length + 1);
        }
    }


    return (
        <>
            <div className="splash-page-wrapper">
                <div className="splash-page-header-container">
                    <div className="splash-page-header-button" >
                        <h1 className="splash-page-title">Dashboard</h1>
                        <div className="splash-page-button">
                            <OpenModalButton
                                modalComponent={ }
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
                            {totalBalance}
                        </div>
                    </div>
                    <div className="splash-page-owe-container">
                        <div>
                            <h3>You owe</h3>
                        </div>
                        <div>
                            {totalBalance}
                        </div>
                    </div>
                    <div className="splash-page-are-owe-container">
                        <div>
                            <h3>You are owed</h3>
                        </div>
                        <div>
                            {totalBalance}
                        </div>
                    </div>
                </div>
                <div className="splash-page-content-container">
                    <div className="you-owe-details-container">
                        <div>
                            <h2>YOU OWE</h2>
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="you-are-owed-details-container">
                        <div>
                            <h2>YOU ARE OWED</h2>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
