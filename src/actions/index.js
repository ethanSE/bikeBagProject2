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
        //create all sides
        let allSides = [];
        coords[coords.length - 1] = coords[0]; //side is closed. ignores las user coord and replaces it
        
        //push in first side
        allSides.push(coords);

        //mirror and push in second side
        let mirroredSide = [];
        //alter it !!!!!!!!!!
        allSides.push(mirroredSide);

        //push in top botton front bac rectangles
            //make an array of side lenghts
            let sideLengths = [];
            for(let i = 0; i < coords.length; i++) {
                //find distance
                let xDifSq = (coords[0][0] - coords[1][0]) ** 2;
                let yDifSq = (coords[0][1] - coords[1][1]) ** 2;
                let newSideLength = Math.sqrt(xDifSq + yDifSq);
                sideLengths.push(newSideLength);
            }
            //for each length make a rectangle of that lenght by 2.5 inches
            let width = getState().scale * 2.5;
            //set up width of rectangle sides
            sideLengths.forEach((sideLength) => {
                let newSide = [];
                newSide.push([0,0]);
                newSide.push([sideLength, 0]);
                newSide.push([sideLength, width]);
                newSide.push([0,width]);
                newSide.push([0,0]);
                allSides.push((newSide));
            })
        //dispatch to store
        dispatch(setCoordinates(allSides));
    }
}