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
import axios from 'axios'

export const listListings = () => async (dispatch) => {
    try {
        dispatch({ 
            type: LISTING_LIST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/listings/`, config)

        dispatch({ 
            type: LISTING_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: LISTING_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createTask = (obj) => async (dispatch, getState) => {
    try {
        
        dispatch({ 
            type: TASK_CREATE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.post(
            `api/listings/create/`,
            obj,
            config
        )

        dispatch({ 
            type: TASK_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const deleteTask = (id) => async (dispatch, getState) => {
    try {
        dispatch({ 
            type: TASK_DELETE_REQUEST 
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.delete(
            `/api/listings/delete/${id}/`,
            config
        )

        dispatch({ 
            type: TASK_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({ 
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}

export const updateTask = (id, obj) => async (dispatch, getState) => {
    try {

        dispatch({ 
            type: TASK_UPDATE_REQUEST,
        })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const {data} = await axios.put(
            `/api/listings/update/${id}/`,
            obj,
            config
        )
        
        dispatch({ 
            type: TASK_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        
        dispatch({ 
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })

    }
}