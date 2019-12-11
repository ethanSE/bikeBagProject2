const styleReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_STYLE':
            return action.style;
        default:
            return state;   
    };
}
export default styleReducer;