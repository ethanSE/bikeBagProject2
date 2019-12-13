import {initialState} from '../constants/InitialState';
const scaleReducer = (state = initialState.scale, action) => {
    switch (action.type) {
        case 'SET_SCALE':
            return action.scale;
        default:
            return state;   
    };
}
export default scaleReducer;