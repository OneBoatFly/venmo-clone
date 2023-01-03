// constants
const SET_FRIENDS = 'friend/SET_FRIENDS';
const SET_PENDINGFROMS = 'friend/SET_PENDINGFROMS';
const SET_PENDINGTOS = 'friend/SET_PENDINGTOS';
const REMOVE_ALLFRIENDS = 'friend/REMOVE_ALLFRIENDS';


const setFriends = (friends) => ({
    type: SET_FRIENDS,
    payload: friends
});

const setPendingFroms = (pendingFroms) => ({
    type: SET_PENDINGFROMS,
    payload: pendingFroms
});

const setPendingTos = (pendingTos) => ({
    type: SET_PENDINGTOS,
    payload: pendingTos
});

export const removeAllFriends = () => ({
    type: REMOVE_ALLFRIENDS,
});


export const fetchAllFriends = () => async (dispatch) => {
    // console.log('---------- fetchAllFriends Thunk ------------')
    const response = await fetch('/api/friends');

    if (response.ok) {
        const data = await response.json();
        dispatch(setFriends(data.Friends))
        dispatch(setPendingFroms(data.PendingFriendsFrom))
        dispatch(setPendingTos(data.PendingFriendsTo))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const createFriendRequest = (to_user_id) => async (dispatch) => {
    // console.log('---------- createFriendRequest Thunk - parameter ------------', to_user_id)
    const response = await fetch(`/api/friends?to_user_id=${to_user_id}`, {
        method: 'POST'
    });

    // console.log('---------- createFriendRequest Thunk - response ------------', response)
    if (response.ok) {
        // const data = await response.json();
        // dispatch(setOpenRequest(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}


export const editFriendRequest = (from_user_id) => async (dispatch) => {
    // console.log('---------- editFriend Thunk - from_user_id ------------', from_user_id)
    const response = await fetch(`/api/friends?from_user_id=${from_user_id}`, {
        method: 'PATCH'
    });

    // console.log('---------- editFriend Thunk - response ------------', response)
    if (response.ok) {
        // const data = await response.json();
        // dispatch(setOpenRequest(data))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }

}


export const deleteFriend = (unfriend_user_id) => async (dispatch) => {
    console.log('---------- deleteFriend Thunk - unfriend_user_id ------------', unfriend_user_id)
    const response = await fetch(`/api/friends?unfriend_user_id=${unfriend_user_id}`, {
        method: 'DELETE'
    });

    console.log('--------- deleteFriend respseons ------', response)
    if (response.ok) {
        // dispatch(removeOpenRequest());
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            console.log('----- deleteFriend error ------', data.errors)
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};


const initialState = { friends: [], pendingFroms: [], pendingTos:[] };
export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_FRIENDS:
            newState.friends = action.payload
            return newState
        case SET_PENDINGFROMS:
            newState.pendingFroms = action.payload
            return newState
        case SET_PENDINGTOS:
            newState.pendingTos = action.payload
            return newState
        case REMOVE_ALLFRIENDS:
            newState.friends = []
            newState.pendingFroms = []
            newState.pendingTos = []
            return newState
        default:
            return state;
    }
}