let initialTrailState = {
    trail: {},
    reviews: [],
    photos: []
}

let trailReducer = (state = initialTrailState, action) => {
    switch(action.type) {
        case "setTrailInfo": 
        return {
            ...state,
            trail: action.payload,
            reviews: action.payload.reviews,
            photos: action.payload.photos 
        }
        case "add_new_review":
            return {
                ...state, 
                reviews: [...state.reviews, action.payload]
            }
        case "delete_review": 
        return {
            ...state, 
            reviews: [action.payload]
        }
        default:
        return state 
    }
}

export default trailReducer; 