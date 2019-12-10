const coordsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_COORDINATES':
            return action.coords;
        default:
            return state;   
    };
}
export default coordsReducer;