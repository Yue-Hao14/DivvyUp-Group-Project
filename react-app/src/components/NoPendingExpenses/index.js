import noExpenses from "../../assets/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
import "./NoPendingExpenses.css"

function NoPendingExpenses() {
    return (
        <div className="no-expenses-wrapper">
            <div className="no-expenses-img">
                <img src={noExpenses} alt="No Pending Expenses img"></img>
            </div>
            <div className="no-expenses-details">
                <h3>You do not have any pending expenses.</h3>
                <p>To add a expense, click the "Add an expense" button</p>
            </div>

        </div>
    )
}

export default NoPendingExpenses
