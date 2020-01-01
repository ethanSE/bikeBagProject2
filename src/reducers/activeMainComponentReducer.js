import { initialState } from '../constants/InitialState';
const customSpecUIReducer = (state = initialState.activeMainComponent, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_MAIN_COMPONENT':
            return action.activeMainComponent;
        default:
            return state;
    };
}
export default customSpecUIReducer;