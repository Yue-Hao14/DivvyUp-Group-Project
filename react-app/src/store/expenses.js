import { RESET } from "./session"

const GET_ALL_EXPENSE = 'expenses/GET_ALL_EXPENSES'
const GET_SINGLE_EXPENSE_DETAILS = 'expenses/GET_SINGLE_EXPENSE_DETAILS'
const GET_SETTLED_EXPENSES = 'expenses/GET_SETTLED_EXPENSES'
const GET_FRIEND_EXPENSES = 'expenses/GET_FRIEND_EXPENSES'
const ADD_EXPENSE = 'expenses/ADD_EXPENSE'
const ADD_PAYMENT = 'expenses/ADD_PAYMENT'
const UPDATE_EXPENSE = 'expenses/UPDATE_EXPENSE'
const DELETE_EXPENSE = 'expenses/DELETE_EXPENSE'


//action creator
export const getAllExpenses = expenses => ({
    type: GET_ALL_EXPENSE,
    payload: expenses
})

export const getSettledExpenses = expenses => ({
    type: GET_SETTLED_EXPENSES,
    payload: expenses
})

export const getFriendExpenses = expenses => ({
    type: GET_FRIEND_EXPENSES,
    payload: expenses
})

export const getSingleExpenseDetails = expenseDetails => ({
    type: GET_SINGLE_EXPENSE_DETAILS,
    payload: expenseDetails
})

export const postExpense = expense => ({
    type: ADD_EXPENSE,
    payload: expense
})

export const postPayment = payment => ({
    type: ADD_PAYMENT,
    payload: payment
})

export const updateExpense = expense => ({
    type: UPDATE_EXPENSE,
    payload: expense
})

export const deleteExpense = expenseId => ({
    type: DELETE_EXPENSE,
    id: expenseId
})


//thunks
export const getAllExpensesThunk = () => async (dispatch) => {
    const res = await fetch ('/api/expenses/');

    if (res.ok) {
        const data = await res.json();
        dispatch(getAllExpenses(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const getSettledExpensesThunk = () => async (dispatch) => {
    const res = await fetch('/api/expenses/settled')

    if (res.ok) {
        const data = await res.json();
        dispatch(getSettledExpenses(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occured. Please try again later"]
    }
}

export const getFriendExpensesThunk = (friendId) => async (dispatch) => {
    const res = await fetch(`/api/users/friends/${friendId}/expenses`);

    if (res.ok) {
        const data = await res.json();
        dispatch(getFriendExpenses(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occured. Please try again later"]
    }
}

export const getSingleExpenseDetailsThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/expenses/${id}`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getSingleExpenseDetails(data))
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occurred. Please try again later."]
    }
}

export const postExpenseThunk = expense => async (dispatch) => {
    const res = await fetch('/api/expenses/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(postExpense(data));
        expense.owerIds.forEach(owerId => {
            dispatch(getFriendExpensesThunk(owerId));
        })
        dispatch(getAllExpensesThunk());
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

export const postPaymentThunk = payment => async (dispatch) => {
    const res = await fetch('/api/payments/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment)
    })

    if (res.ok) {
        // update settledExpense slice of store
        dispatch(getSettledExpensesThunk());
        // update currentExpenseSummaries slice
        dispatch(getFriendExpensesThunk(payment.owerId));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

export const updateExpenseThunk = expense => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expense.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expense)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(updateExpense(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

export const deleteExpenseThunk = expenseId => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expenseId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteExpense(expenseId));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

//reducer

const initialState = {
                        allExpenses : {},
                        settledExpenses: {},
                        currentExpenseSummaries: {},
                        currentExpenseDetails: {}
                     }
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_EXPENSE: {
            const expenses = {}
            for (const expense of action.payload) {
                expenses[expense.id] = expense
            }
            return { ...state, allExpenses: expenses, currentExpenseSummaries: expenses }
        }
        case GET_SINGLE_EXPENSE_DETAILS: {
            return {...state, currentExpenseDetails: action.payload}
        }
        case GET_FRIEND_EXPENSES: {
            const newState = { ...state };
            const friendExpenses = {};
            for (const expense of action.payload) {
                friendExpenses[expense.id] = expense
            }
            newState.currentExpenseSummaries = friendExpenses;
            return newState;
        }
        case GET_SETTLED_EXPENSES: {
            const settledPayments = {}
            for (const expense of action.payload) {
                settledPayments[expense.id] = expense
            }
            return {...state, settledExpenses: settledPayments};
        }
        case ADD_EXPENSE: {
            const newState = {...state};
            newState.allExpenses = { ...state.allExpenses, [action.payload.id]: action.payload };
            newState.currentExpenseSummaries = { ...state.currentExpenseSummaries, [action.payload.id]: action.payload };
            return newState;
        }
        case UPDATE_EXPENSE: {
            const newState = { ...state };
            newState.allExpenses = { ...state.allExpenses, [action.payload.id]: action.payload };
            newState.currentExpenseSummaries = { ...state.currentExpenseSummaries, [action.payload.id]: action.payload };
            newState.currentExpenseDetails = action.payload;
            return newState;
        }
        case DELETE_EXPENSE: {
            const newState = { ...state }
            newState.allExpenses = { ...state.allExpenses }
            newState.currentExpenseSummaries = { ...state.currentExpenseSummaries }
            newState.currentExpenseDetails = null
            delete newState.allExpenses[action.id]
            delete newState.currentExpenseSummaries[action.id]
            return newState
        }
        case RESET: {
            return initialState;
        }
        default:
            return state
    }
}
