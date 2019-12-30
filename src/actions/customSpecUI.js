import constants from './../constants';
const { types } = constants;

export function setActiveCustomSpecComponent() {    
    return (dispatch, getState) => {
        console.log('string');
        let existingUIState = getState().customSpecUI;
        let newUIState;
        console.log(existingUIState);
        dispatch(setCustomSpecUI(newUIState));
    }
}

export const setCustomSpecUI = (newCustomSpecUIState) => ({
    type: types.SET_CUSTOMSPEC_UI,
    customSpecUI: newCustomSpecUIState
});