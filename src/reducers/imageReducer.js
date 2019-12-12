const imageReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_IMAGE':
        console.log('image set')
            return action.image;
        default:
            return state;   
    };
}
export default imageReducer;