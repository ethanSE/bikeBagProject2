export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_COORDINATE':
           //add a new coordinate to coordinates slice of state
            return state;  //will change
        case 'REMOVE_ALL_COORDINATES':
            //deletes all coordinates
            return state; //will change
        default:
            return state;
    }
};