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

export const setImage = (image) => ({
    type: types.SET_IMAGE,
    image: image
});

export const setSvgString = (svgString) => ({
    type: types.SET_SVG_STRING,
    svgString: svgString
});

export const setCanvasSize = (dimensions) => ({
    type: types.SET_DISPLAY_CANVAS_SIZE,
    dimensions: dimensions
});