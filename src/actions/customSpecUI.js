import constants from './../constants';
import cloneDeep from 'clone-deep';
const { types } = constants;

export const setCustomSpecUI = (newCustomSpecUIState) => ({
    type: types.SET_CUSTOMSPEC_UI,
    customSpecUIState: newCustomSpecUIState
});

export function setActiveCustomSpecComponent(newActiveComponent) {
    return (dispatch, getState) => {
        let newUIState = cloneDeep(getState().customSpecUI);
        switch (newActiveComponent) {
            case 'image':
                if (newUIState.scale === 'active') newUIState.scale = 'minimized';
                if (newUIState.shape === 'active') newUIState.shape = 'minimized';
                newUIState.image = 'active';
                break;
            case 'scale':
                if (newUIState.image === 'active') newUIState.image = 'minimized';
                if (newUIState.shape === 'active') newUIState.shape = 'minimized';
                newUIState.scale = 'active';
                break;
            case 'shape':
                if (newUIState.image === 'active') newUIState.image = 'minimized';
                if (newUIState.scale === 'active') newUIState.scale = 'minimized';
                newUIState.shape = 'active';
                break;
            case 'download':
                newUIState.image = 'minimized';
                newUIState.scale = 'minimized';
                newUIState.shape = 'minimized';
                newUIState.download = 'active';
                break;
            case 'signInActive':
                newUIState.signIn = 'active';
                break;
            case 'signInHidden':
                newUIState.signIn = 'hidden';
                break;
            default:
                break;
        }
        dispatch(setCustomSpecUI(newUIState));
    }
}