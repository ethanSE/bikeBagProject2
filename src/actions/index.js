import * as types from './../constants/ActionTypes';

export const setCoordinates = (coords) => ({
    type: types.setCoordinates,
    coords: coords    
});

export const setStyle = (style) => ({
    type: types.setStyle,
    style: style
});

export const setScale = (scale) => ({
    type: types.setScale,
    scale: scale
});