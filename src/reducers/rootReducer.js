import {combineReducers} from 'redux'
import trailReducer from './trailReducer'

let initialUserState = {
    username: "",
    id: null, 
    token: "",
    lists: []
}

let userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case "setUserInfo":
            return {
                ...state,
                username: action.payload.user.username,
                token: action.payload.token,
                id: action.payload.user.id,
                lists: action.payload.user.lists
            }
        default: 
            return state
    }
}

const rootReducer = combineReducers({trailReducer, userReducer})

export default rootReducer; 