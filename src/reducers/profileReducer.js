let initialProfileState = {
    username: "",
    id: null, 
    email: "",
    profilePic: "",
    location: "",
    name: ""
}

let profileReducer = (state = initialProfileState, action) => {
    switch(action.type) {
        case "setProfileInfo":
            return {
                ...state,
                username: action.payload.username,
                id: action.payload.id,
                email: action.payload.email,
                location: action.payload.location,
                profilePic: action.payload.profile_picture,
                name: action.payload.name
            }
        default: 
            return state
    }
}

export default profileReducer; 