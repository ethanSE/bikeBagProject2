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

export function createAllSides(coords) {
    return (dispatch, getState) => {
        let allSides = [];      
        allSides.push(coords);
        let halfWidth = Math.max(...(coords.map(c => c[0]))) / 2;
        let mirroredSide = coords.map((coord) => {
            let newX = halfWidth + (halfWidth - coord[0])
            return ([newX,coord[1]]);
            }
        );
        allSides.push(mirroredSide);    
        let sideLengths = [];
        for (let i = 0; i < coords.length - 1; i++) {
            let xDifSq = (coords[i][0] - coords[i + 1][0]) ** 2;
            let yDifSq = (coords[i][1] - coords[i + 1][1]) ** 2;
            let newSideLength = Math.sqrt(xDifSq + yDifSq);
            sideLengths.push(newSideLength);
        }
        let width = getState().scale * 2.5;
        sideLengths.forEach((sideLength) => {
            let newSide = [];
            newSide.push([0, 0]);
            newSide.push([sideLength, 0]);
            newSide.push([sideLength, width]);
            newSide.push([0, width]);
            newSide.push([0, 0]);
            allSides.push((newSide));
        });
        console.log(sideLengths);
        dispatch(setCoordinates(allSides));
    }
}