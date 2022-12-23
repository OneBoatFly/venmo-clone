// constants
const SET_USER_TRANSACTIONS = 'session/SET_USER_TRANSACTIONS';
const REMOVE_USER_TRANSACTIONS = 'session/REMOVE_USER_TRANSACTIONS';
const SET_FRIEND_TRANSACTIONS = 'session/SET_FRIEND_TRANSACTIONS';
const REMOVE_FRIEND_TRANSACTIONS = 'session/REMOVEFRIEND_TRANSACTIONS';
const SET_TRANSACTION = 'session/SET_TRANSACTION';
const REMOVE_TRANSACTION = 'session/REMOVE_TRANSACTION';


const setUserTransactions = (transactions) => ({
    type: SET_USER_TRANSACTIONS,
    payload: transactions
});

export const removeUserTransactions = () => ({
    type: REMOVE_USER_TRANSACTIONS,
});

const setFriendTransactions = (transactions) => ({
    type: SET_FRIEND_TRANSACTIONS,
    payload: transactions
});

export const removeFriendTransactions = () => ({
    type: REMOVE_FRIEND_TRANSACTIONS,
});

const setTransaction = (transaction) => ({
    type: SET_TRANSACTION,
    payload: transaction
});

export const removeTransaction = () => ({
    type: REMOVE_TRANSACTION,
});


export const fetchAllTransactions = () => async (dispatch) => {
    console.log('---------- fetchAllTransactions Thunk ------------')
    const response = await fetch('/api/transactions');

    if (response.ok) {
        const data = await response.json();
        dispatch(setUserTransactions(data.UserTransactions))
        dispatch(setFriendTransactions(data.FriendsTransactions))
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


export const fetchOneTransactions = (transactionId) => async (dispatch) => {
    console.log('---------- fetchOneTransactions Thunk ------------', transactionId)
    const response = await fetch(`/api/transactions/${transactionId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setTransaction(data))
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


export const createTransaction = (transaction) => async (dispatch) => {
    console.log('---------- createTransaction Thunk - body ------------', transaction)
    const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
    });

    console.log('---------- createTransaction Thunk - response ------------', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(setTransaction(data))
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


const initialState = { userTransactions: [], friendsTransactions: [], oneTransaction: null };
export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER_TRANSACTIONS:
            newState.userTransactions = action.payload
            return newState
        case REMOVE_USER_TRANSACTIONS:
            newState.userTransactions = []
            return newState
        case SET_FRIEND_TRANSACTIONS:
            newState.friendsTransactions = action.payload
            return newState
        case REMOVE_FRIEND_TRANSACTIONS:
            newState.friendsTransactions = []
            return newState
        case SET_TRANSACTION:
            newState.oneTransaction = action.payload
            return newState
        case REMOVE_TRANSACTION:
            newState.oneTransaction = null
            return newState            
        default:
            return state;
    }
}