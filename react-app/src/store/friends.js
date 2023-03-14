// constants
import { RESET } from "./session";
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const ADD_FRIEND = 'friends/ADD_FRIEND'
const REMOVE_FRIEND = 'friends/REMOVE_FRIEND'

// action creator
export const getAllFriends = friends => ({
	type: GET_ALL_FRIENDS,
	payload: friends
});

export const addFriend = friend => ({
    type: ADD_FRIEND,
    payload: friend
})

export const removeFriend = friendId => ({
    type: REMOVE_FRIEND,
    payload: friendId
})


// thunks
export const getAllFriendsThunk = () => async (dispatch) => {
    const res = await fetch('/api/users/friends');
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllFriends(data));
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

export const addFriendThunk = (email) => async (dispatch) => {
    const res = await fetch('api/users/friends', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(email)
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(addFriend(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        return data.errors
    } else {
        return ["An Error occured. Please try again later."]
    }
}

export const removeFriendThunk = (friendId) => async (dispatch) => {
    const res = await fetch(`/api/users/friends/${friendId}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(removeFriend(friendId))
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        return data.errors
    } else {
        return ["An Error occured. Please try again later."]
    }
}

// reducer
const initialState = {}
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_FRIEND: {
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState
        }
        case GET_ALL_FRIENDS: {
            const friends = {}
            for (const friend of action.payload) {
                friends[friend.id] = friend
            }
            return friends
        }
        case REMOVE_FRIEND: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState
        }
        case RESET:
            return initialState
        default:
            return state
    }
}
