import * as types from './../constants/ActionTypes';

export const setCoordinates = (coords) => ({
    type: types.SET_COORDINATES,
    coords: coords    
});

export const setStyle = (style) => ({
    type: types.SET_STYLE,
    style: style
});

export const setScale = (scale) => ({
    type: types.SET_SCALE,
    scale: scale
});