import { RESET } from "./session"

// contants
const GET_EXPENSE_COMMENTS = 'comments/GET_EXPENSE_COMMENTS'
const ADD_COMMENT_TO_EXPENSE = 'comments/ADD_COMMENT_TO_EXPENSE'

// action creator
const getExpenseComments = comments => ({
    type: GET_EXPENSE_COMMENTS,
    payload: comments
})

const addCommentToExpense = comment => ({
    type: ADD_COMMENT_TO_EXPENSE,
    payload: comment
})

// thunks
export const getExpenseCommentsThunk = expenseId => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expenseId}/comments`)

    if (res.ok) {
        const data = await res.json();
        dispatch(getExpenseComments(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

export const addCommentToExpenseThunk = (expenseId, comment) => async (dispatch) => {
    const res = await fetch(`/api/expenses/${expenseId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addCommentToExpense(data));
        return null
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors
        }
    } else {
        return ["An Error occured. Please try again later."]
    }
}

// reducer
const initialState = {}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_EXPENSE_COMMENTS: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload.comments;
            return newState;
        }
        case ADD_COMMENT_TO_EXPENSE: {
            const newState = { ...state };
            newState[action.payload.id] = [ ...state[action.payload.id], action.payload.comment ]
            return newState;
        }
        case RESET: {
            return initialState;
        }
        default: {
            return state
        }
    }
}
