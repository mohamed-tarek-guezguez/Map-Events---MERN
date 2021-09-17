import {
    LISTING_LIST_REQUEST,
    LISTING_LIST_SUCCESS,
    LISTING_LIST_FAIL,

    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,
    TASK_CREATE_RESET,

    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_FAIL,
    TASK_UPDATE_RESET,

    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
} from '../constants/listing'

export const listingListReducer = (state = { listings: [] }, action) => {
    switch (action.type) {
        case LISTING_LIST_REQUEST:
            return { 
                loading: true, 
                listings: [] 
            }

        case LISTING_LIST_SUCCESS:
            return { 
                loading: false, 
                listings: action.payload,
            }

        case LISTING_LIST_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }

        default:
            return state
    }
}

export const taskCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TASK_CREATE_REQUEST:
            return { loading: true }

        case TASK_CREATE_SUCCESS:
            return { loading: false, success: true }

        case TASK_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case TASK_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const taskDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TASK_DELETE_REQUEST:
            return { loading: true }

        case TASK_DELETE_SUCCESS:
            return { loading: false, success: true }

        case TASK_DELETE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const taskUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case TASK_UPDATE_REQUEST:
            return { loading: true }

        case TASK_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case TASK_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case TASK_UPDATE_RESET:
            return {}

        default:
            return state
    }
}