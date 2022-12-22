// constants
const SET_SELECTED_USER = 'session/SET_SELECTED_USER';
const REMOVE_SELECTED_USER = 'session/REMOVE_SELECTED_USER';
const SET_ALL_USERS = 'session/SET_ALL_USERS';
const REMOVE_ALL_USERS = 'session/REMOVE_ALL_USERS';


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

const initialState = { selectedUser: null, allUsers: [] };
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
            newState.allUsers = null
            return newState         
        default:
            return state;
    }
}