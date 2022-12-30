import {arrToObj} from '../utils/arrToObj';

// constants
const SET_USER_TRANSACTIONS = 'transaction/SET_USER_TRANSACTIONS';
const REMOVE_USER_TRANSACTIONS = 'transaction/REMOVE_USER_TRANSACTIONS';
const SET_FRIEND_TRANSACTIONS = 'transaction/SET_FRIEND_TRANSACTIONS';
const REMOVE_FRIEND_TRANSACTIONS = 'transaction/REMOVEFRIEND_TRANSACTIONS';
const SET_TRANSACTION = 'transaction/SET_TRANSACTION';
const REMOVE_TRANSACTION = 'transaction/REMOVE_TRANSACTION';
const UPDATE_USER_TRANSACTIONS = 'transaction/UPDATE_USER_TRANSACTIONS';
const UPDATE_FRIEND_TRANSACTIONS = 'transaction/UPDATE_FRIEND_TRANSACTIONS';


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

const updateUserTransaction = (transaction) => ({
    type: UPDATE_USER_TRANSACTIONS,
    payload: transaction
});


const updateFriendTransaction = (transaction) => ({
    type: UPDATE_FRIEND_TRANSACTIONS,
    payload: transaction
});


export const fetchAllTransactions = () => async (dispatch) => {
    console.log('---------- fetchAllTransactions Thunk ------------')
    const response = await fetch('/api/transactions');

    if (response.ok) {
        const data = await response.json();

        const userTransactionObj = arrToObj(data.UserTransactions);
        const friendTransactionObj = arrToObj(data.FriendsTransactions);

        dispatch(setUserTransactions(userTransactionObj))
        dispatch(setFriendTransactions(friendTransactionObj))
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


export const fetchOneTransaction = (transactionId) => async (dispatch) => {
    console.log('---------- fetchOneTransactions Thunk ------------', transactionId)
    const response = await fetch(`/api/transactions/${transactionId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(setTransaction(data));
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


export const likeTransaction = (transactionId, isUserTran) => async (dispatch) => {
    console.log('---------- likeTransaction Thunk - transactionId, isUserTran ------------', transactionId, isUserTran)
    const response = await fetch(`/api/likes?transactionId=${transactionId}`, {
        method: 'POST'
    });

    console.log('---------- likeTransaction Thunk - response ------------', response, response.ok)
    if (response.ok) {
        console.log('-------------response.ok--------')
        const data = await response.json();
        console.log('----------- data -----------', data, isUserTran)
        if (isUserTran) {
            console.log('sending update user transaction action')
            dispatch(updateUserTransaction(data));
        } else dispatch(updateFriendTransaction(data));

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


export const unlikeTransaction = (transactionId, isUserTran) => async (dispatch) => {
    console.log('---------- unlikeTransaction Thunk - transactionId ------------', transactionId, isUserTran)
    const response = await fetch(`/api/likes?transactionId=${transactionId}`, {
        method: 'DELETE'
    });

    console.log('---------- unlikeTransaction Thunk - response ------------', response)
    if (response.ok) {
        const data = await response.json();
        console.log('----------- data -----------', data, isUserTran)
        if (isUserTran) {
            console.log('sending update user transaction action')
            dispatch(updateUserTransaction(data));
        } else dispatch(updateFriendTransaction(data));
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


export const createComment = (body, transactionId) => async (dispatch) => {
    console.log('---------- createComment Thunk - transactionId ------------', body, transactionId)
    const response = await fetch(`/api/comments?transactionId=${transactionId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)        
    });

    console.log('---------- createComment Thunk - response ------------', response)
    if (response.ok) {
        dispatch(fetchOneTransaction(transactionId))
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


export const deleteComment = (commentId, transactionId) => async (dispatch) => {
    // console.log('---------- deleteComment Thunk - commentId ------------', commentId)
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(fetchOneTransaction(transactionId))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
};


const initialState = { userTransactions: {}, friendsTransactions: {}, oneTransaction: null };
export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_USER_TRANSACTIONS:
            newState.userTransactions = action.payload
            return newState
        case REMOVE_USER_TRANSACTIONS:
            newState.userTransactions = {}
            return newState
        case SET_FRIEND_TRANSACTIONS:
            newState.friendsTransactions = action.payload
            return newState
        case REMOVE_FRIEND_TRANSACTIONS:
            newState.friendsTransactions = {}
            return newState
        case SET_TRANSACTION:
            newState.oneTransaction = action.payload
            return newState
        case REMOVE_TRANSACTION:
            newState.oneTransaction = null
            return newState
        case UPDATE_USER_TRANSACTIONS:
            // console.log('old state >>>', state.userTransactions[action.payload.id])
            // console.log('in update userTransactions, transaction, transactionId---', action.payload, action.payload.id)
            // newState.userTransactions[action.payload.id] = action.payload;
            
            const updateUserState = {
                ...state,
                userTransactions: {
                    ...state.userTransactions,
                    [action.payload.id]: action.payload
                }
            }

            // console.log('user transaction state, specific transaction---', updateState.userTransactions[action.payload.id])
            return updateUserState
        case UPDATE_FRIEND_TRANSACTIONS:
            return {
                ...state,
                friendsTransactions: {
                    ...state.friendsTransactions,
                    [action.payload.id]: action.payload
                }
            }       
        default:
            return state;
    }
}