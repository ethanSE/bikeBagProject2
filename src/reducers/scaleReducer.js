const scaleReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_SCALE':
            return action.scale;
        default:
            return state;   
    };
}
export default scaleReducer;