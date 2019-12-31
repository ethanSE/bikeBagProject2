import { initialState } from '../constants/InitialState';
const styleReducer = (state = initialState.style, action) => {
    switch (action.type) {
        case 'SET_STYLE':
            return action.style;
        default:
            return state;   
    };
}
export default styleReducer;