import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react"
import { Redirect } from "react-router-dom";
import { getFriendExpensesThunk } from "../../store/expenses";

function TotalBalance() {

    const sessionUser = useSelector(state => state.session.user)
    const userExpenses = useSelector(state => state.expenses.currentExpenseSummaries)
    const dispatch = useDispatch();

    useEffect(() => {
        if (sessionUser) {
            dispatch(getFriendExpensesThunk());
        }
    }, [dispatch, sessionUser]);

    // console.log(sessionUser);
    if (!sessionUser) return <Redirect to='/' />

    const expensesArr = Object.values(userExpenses);

    let totalOwed = 0;
    let totalDebt = 0;
    let totalSettled = 0;
    let totalSettledByOthers = 0
    let totalBalance = 0;

    for (let i = 0; i < expensesArr.length; i++) {
        const expense = expensesArr[i];

        // Check if user is the payer
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
                    }
                }
            }
        } else {
            totalSettledByOthers = (expense.amount / (expense.owers.length + 1)) * expense.settledOwers.length;

        }
    }

    totalBalance = totalOwed - totalDebt + totalSettled - totalSettledByOthers


    return (
        <>
            <h2>Your Total Balance: {totalBalance.toFixed(2)}</h2>
        </>
    )
}

export default TotalBalance
