import {combineReducers} from 'redux'
import trailReducer from './trailReducer'

let initialUserState = {
    username: "",
    id: null, 
    token: "",
    lists: [],
    email: "",
    profilePic: "",
    location: "",
    name: ""
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
        case "setUserProfileInfo":
        return {
            ...state,
            email: action.payload.email,
            location: action.payload.location,
            profilePic: action.payload.profile_picture,
            name: action.payload.name
        }
        case "edit_profile_info":
            return{
                ...state,
                email: action.payload.email,
                location: action.payload.location,
                profilePic: action.payload.profile_picture,
                name: action.payload.name,
                username: action.payload.username
            }
        default: 
            return state
    }
}

const rootReducer = combineReducers({trailReducer, userReducer})

export default rootReducer; 