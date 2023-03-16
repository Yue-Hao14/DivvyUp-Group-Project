import { RESET } from "./session"

// contants
const GET_EXPENSE_COMMENTS = 'comments/GET_EXPENSE_COMMENTS'
const ADD_COMMENT_TO_EXPENSE = 'comments/ADD_COMMENT_TO_EXPENSE'
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'
const DELETE_COMMENT = 'comments/DELETE_COMMENT'

// action creator
const getExpenseComments = comments => ({
    type: GET_EXPENSE_COMMENTS,
    payload: comments
})

const addCommentToExpense = comment => ({
    type: ADD_COMMENT_TO_EXPENSE,
    payload: comment
})

const updateComment = comment => ({
    type: UPDATE_COMMENT,
    payload: comment
})

const deleteComment = (expenseId, commentId) => ({
    type: DELETE_COMMENT,
    expenseId,
    commentId
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

export const updateCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"comment": comment.comment})
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(updateComment(data));
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

export const deleteCommentThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteComment(comment.expenseId, comment.id));
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
        case UPDATE_COMMENT: {
            const newState = { ...state };
            newState[action.payload.id] = [ ...state[action.payload.id] ]
            const commentIndex = newState[action.payload.id].findIndex(comment => comment.id === action.payload.comment.id);
            newState[action.payload.id].splice(commentIndex, 1, action.payload.comment)
            return newState
        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            newState[action.expenseId] = [ ...state[action.expenseId] ]
            const commentIndex = newState[action.expenseId].findIndex(comment => comment.id === action.commentId);
            newState[action.expenseId].splice(commentIndex, 1)
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
