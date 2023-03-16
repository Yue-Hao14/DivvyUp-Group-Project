import { useSelector } from "react-redux";
import { getMMDDYYYY } from "../../utils/utils";

function PaymentDetails({ expense }) {
    const sessionUser = useSelector(state => state.session.user);
    console.log("expnese in payment details ===================================", expense)

    const splitAmount = (expense.amount / (expense.owers.length + 1)).toFixed(2);
    const expenseDate = new Date(expense.expenseDate)

    let date = expenseDate.getUTCDate();
    date = (date < 10) ? "0" + date.toString() : date.toString();

    let paymentDetails;
    if (sessionUser.id !== expense.payer.id) {
        // if user is not payer
        // find when user paid
        const userSettledDate = expense.settledOwers.find(user => user.settledUserId === sessionUser.id).settledDate;
        const formattedSettledDate = getMMDDYYYY(new Date(userSettledDate));
        paymentDetails = (<div className="payment_details">You paid {expense.payer.firstName} {expense.payer.lastName[0]}. ${splitAmount} on {formattedSettledDate}</div>)
    } else {
        // if user is payer
        // iterate over all settled owers
        paymentDetails = expense.settledOwers.map((settledUser, idx) => {
            const formattedSettledDate = getMMDDYYYY(new Date(settledUser.settledDate));
            const ower = expense.owers.find(ower => ower.id === settledUser.settledUserId);

            return (
                <div key={idx} className="payment_details">{ower.firstName} {ower.lastName[0]}. paid you ${splitAmount} on {formattedSettledDate}.</div>
            )
        })
    }


    return (
        <div className="payment_details_div">
            <div className="payment_details_heading">
                <div className="payment_details_date">{date}</div>
                <div className="payment_details_list">
                    {paymentDetails}
                </div>
            </div>
        </div>
    )
}

export default PaymentDetails;
