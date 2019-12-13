const coordsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DISPLAY_CANVAS_SIZE':
            return action.dimensions;
        default:
            return state;
    };
}
export default coordsReducer;