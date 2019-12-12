import {initialState} from '../constants/InitialState';
const coordsReducer = (state = initialState.coords, action) => {
    switch (action.type) {
        case 'SET_COORDINATES':
            return action.coords;
        default:
            return state;   
    };
}
export default coordsReducer;