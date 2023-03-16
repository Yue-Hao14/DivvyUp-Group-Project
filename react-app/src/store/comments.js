// contants
const GET_EXPENSE_COMMENTS = 'comments/GET_EXPENSE_COMMENTS'

// action creator
const getExpenseComments = comments => ({
    type: GET_EXPENSE_COMMENTS,
    payload: comments
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

// reducer
const initialState = {}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_EXPENSE_COMMENTS: {
            const newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default: {
            return state
        }
    }
}
