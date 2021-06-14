import {combineReducers} from 'redux'
import trailReducer from './trailReducer'
import profileReducer from './profileReducer'

let initialUserState = {
    username: "",
    id: null, 
    token: "",
    lists: [],
    email: "",
    profilePic: "",
    location: "",
    name: "",
    trailLists: []
}

let userReducer = (state = initialUserState, action) => {
    switch(action.type) {
        case "setUserInfo":
            return {
                ...state,
                username: action.payload.user.username,
                token: action.payload.token,
                id: action.payload.user.id,
                email: action.payload.user.email,
                location: action.payload.user.location,
                profilePic: action.payload.user.profile_picture,
                name: action.payload.user.name,
                lists: action.payload.user.lists,
                trailLists: action.payload.user.lists[0].trail_lists 
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

const rootReducer = combineReducers({trailReducer, userReducer, profileReducer})

export default rootReducer; 