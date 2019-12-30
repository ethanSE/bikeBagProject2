import { initialState } from '../constants/InitialState';
const customSpecUIReducer = (state = initialState.customSpecUI, action) => {
    switch (action.type) {
        case 'SET_CUSTOMSPEC_UI':
            return action.newCustomSpecUIState;
        default:
            return state;
    };
}
export default customSpecUIReducer;