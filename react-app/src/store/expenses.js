const GET_ALL_EXPENSE = 'expenses/GET_ALL_EXPENSE'
const GET_SINGLE_EXPENSE = 'expenses/GET_SINGLE_EXPENSE'
const ADD_EXPENSE = 'expenses/ADD_EXPENSE'
const DELETE_EXPENSE = 'expenses/DELETE_EXPENSE'



//action creator
const getAllExpenses = expenses => ({
    type: GET_ALL_EXPENSE,
    payload: expenses
})

const getSingleExpense = expense => ({
    type: GET_SINGLE_EXPENSE,
    payload: expense
})


//thunks
export const getAllExpensesThunk = () => async (dispatch) => {
    const res = await fetch ('/api/expenses');

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

export const getSingleExpenseThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/expenses/${id}`)

    if (res.ok) {
        const data = await response.json();
        dispatch(getSingleExpense(data))
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

//reducer

const initialState = {allExpenses : {}, singleExpense : {}}
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_EXPENSE: {
            const expenses = {}
            for (const expense of action.payload) {
                expenses[expense.id] = expense
            }
            return {...state, allExpenses: expenses}
        }
        case GET_SINGLE_EXPENSE: {
            let newState = {...state}
            newState.singleExpense = action.payload
            return newState;
        }
        default:
            return state
    }
}
