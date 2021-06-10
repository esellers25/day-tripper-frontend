let initialTrailState = []

let trailReducer = (state = initialTrailState, action) => {
    switch(action.type) {
        case "setTrailInfo": 
        return {
            ...state,
            trails: action.payload
        }
        default:
        return state 
    }
}

export default trailReducer; 