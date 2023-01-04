// constants
const SET_SELECTED_USER = 'session/SET_SELECTED_USER';
const REMOVE_SELECTED_USER = 'session/REMOVE_SELECTED_USER';
const SET_ALL_USERS = 'session/SET_ALL_USERS';
const REMOVE_ALL_USERS = 'session/REMOVE_ALL_USERS';
const SET_NON_FRIENDS_USERS = 'session/SET_NON_FRIENDS_USERS';
const REMOVE_NON_FRIENDS_USERS = 'session/REMOVE_NON_FRIENDS_USERS';


const setSelectedUser = (user) => ({
    type: SET_SELECTED_USER,
    payload: user
});

export const removeSelectedUser = () => ({
    type: REMOVE_SELECTED_USER,
});

const setAllUsers = (users) => ({
    type: SET_ALL_USERS,
    payload: users
});

export const removeAllUsers = () => ({
    type: REMOVE_ALL_USERS,
});

const setNonFriendUsers = (users) => ({
    type: SET_NON_FRIENDS_USERS,
    payload: users
});

export const removeNonFriendUsers = () => ({
    type: REMOVE_NON_FRIENDS_USERS,
});


export const fetchSelectedUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(setSelectedUser(data));
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


export const fetchAllUsers = () => async (dispatch) => {
    // console.log('in fectch all users thunk')
    const response = await fetch('/api/users');

    if (response.ok) {
        const data = await response.json();
        dispatch(setAllUsers(data.users))
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


export const fetchNonFriendUsers = () => async (dispatch) => {
    // console.log('in fectch non friend users thunk')
    const response = await fetch('/api/users/nonfriends');

    if (response.ok) {
        const data = await response.json();
        dispatch(setNonFriendUsers(data.non_friend_users))
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


const initialState = { selectedUser: null, allUsers: [], nonFriendUsers: [] };
export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case SET_SELECTED_USER:
            newState.selectedUser = action.payload
            return newState
        case REMOVE_SELECTED_USER:
            newState.selectedUser = null
            return newState
        case SET_ALL_USERS:
            newState.allUsers = action.payload
            return newState
        case REMOVE_ALL_USERS:
            newState.allUsers = []
            return newState
        case SET_NON_FRIENDS_USERS:
            newState.nonFriendUsers = action.payload
            return newState
        case REMOVE_NON_FRIENDS_USERS:
            newState.nonFriendUsers = []
            return newState                   
        default:
            return state;
    }
}