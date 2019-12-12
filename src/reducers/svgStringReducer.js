const svgStringReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SVG_STRING':
        console.log('svg string set');
            return action.svgString;
        default:
            return state;   
    };
}
export default svgStringReducer;