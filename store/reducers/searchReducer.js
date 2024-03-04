const initalState = {
    search: '',
}

const searchReducer = (state = initalState, action) => {
    switch(action.type){
        case "SET_SEARCH":
            return{
                ...state,
                search: action.payload
            }
        default:
            return state;
    }
}

export default searchReducer;