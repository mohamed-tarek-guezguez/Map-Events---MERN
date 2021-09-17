import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { 
    userLoginReducer, 
    userRegisterReducer,
} from './reducers/user'

import { 
    listingListReducer,
    taskCreateReducer,
    taskDeleteReducer,
    taskUpdateReducer,
} from './reducers/listing'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    listingList: listingListReducer,
    taskCreate: taskCreateReducer,
    taskDelete: taskDeleteReducer,
    taskUpdate: taskUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    },
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store