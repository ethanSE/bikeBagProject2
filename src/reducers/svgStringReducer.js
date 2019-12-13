const svgStringReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SVG_STRING':
            return action.svgString;
        default:
            return state;   
    };
}
export default svgStringReducer;