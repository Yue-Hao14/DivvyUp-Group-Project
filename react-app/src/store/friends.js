// constants
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'

// action creator
const getAllFriends = friends => ({
	type: GET_ALL_FRIENDS,
	payload: friends
});


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

// reducer
const initialState = {}
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_FRIENDS: {
            const friends = {}
            for (const friend of action.payload) {
                friends[friend.id] = friend
            }
            return friends
        }
        default:
            return state
    }
}
