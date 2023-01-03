// constants
const SET_OPEN_REQUEST = 'openRequests/SET_OPEN_REQUEST';
const REMOVE_OPEN_REQUEST = 'openRequests/REMOVE_OPEN_REQUEST';
const SET_ALL_OPEN_REQUESTS = 'openRequests/SET_ALL_OPEN_REQUESTS';
const REMOVE_ALL_OPEN_REQUESTS = 'openRequests/REMOVE_ALL_OPEN_REQUESTS';


const setOpenRequest = (openRequest) => ({
    type: SET_OPEN_REQUEST,
    payload: openRequest
});

export const removeOpenRequest = () => ({
    type: REMOVE_OPEN_REQUEST,
});

const setAllOpenRquests = (openRequests) => ({
    type: SET_ALL_OPEN_REQUESTS,
    payload: openRequests
});

export const removeAllOpenRquests = () => ({
    type: REMOVE_ALL_OPEN_REQUESTS,
});


export const fetchAllOpenRequests = () => async (dispatch) => {
    // console.log('---------- fetchAllOpenRequest Thunk ------------')
    const response = await fetch('/api/requests');

    if (response.ok) {
        const data = await response.json();
        dispatch(setAllOpenRquests(data))
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

export const createOpenRequest = (openRequest) => async (dispatch) => {
    // console.log('---------- createOpenRequest Thunk - body ------------', openRequest)
    const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(openRequest)
    });

    // console.log('---------- createOpenRequest Thunk - response ------------', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(setOpenRequest(data))
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


export const editOpenRequest = (openRequest, openRequestId) => async (dispatch) => {
    // console.log('---------- editOpenRequest Thunk - body ------------', openRequest)
    // console.log('---------- editOpenRequest Thunk - openRequestId ------------', openRequestId)
    const response = await fetch(`/api/requests/${openRequestId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(openRequest)
    });

    // console.log('---------- editOpenRequest Thunk - response ------------', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(setOpenRequest(data))
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


export const deleteOpenRequest = (openRequestId) => async (dispatch) => {
    // console.log('---------- deleteOpenRequest Thunk - openRequestId ------------', openRequestId)
    const response = await fetch(`/api/requests/${openRequestId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeOpenRequest());
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


const initialState = { openRequests: {}, currentRequest: null };
export default function reducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case SET_OPEN_REQUEST:
            newState.currentRequest = action.payload
            return newState
        case REMOVE_OPEN_REQUEST:
            newState.currentRequest = null
            return newState
        case SET_ALL_OPEN_REQUESTS:
            newState.openRequests = action.payload
            return newState
        case REMOVE_ALL_OPEN_REQUESTS:
            newState.openRequests = null
            return newState
        default:
            return state;
    }
}