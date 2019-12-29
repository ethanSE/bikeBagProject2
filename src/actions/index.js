import { myFirebase } from './../firebase/firebase';
import constants from './../constants';
const { types } = constants;

export function sendNewUserToFirebase(email, password) {
    console.log(email, password);
    return () => myFirebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
}

export function signOut() {
    return () => {
        myFirebase.auth().signOut().then(console.log(myFirebase.auth().currentUser));
    }
}

export function watchAuthState() {
    return function (dispatch) {
        myFirebase.auth().onAuthStateChanged(function(user) {
            dispatch(setUser(user));
        })
    }
}

export function signIn(email, password) {
    return () => {
        myFirebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        })
        .then(console.log(myFirebase.auth().currentUser))
    }
}

export const setUser = (user) => ({ 
    type: types.SET_USER,
    user: user
});

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
            return ([newX, coord[1]]);
        }
        );
        allSides.push(mirroredSide);
        let sideLengths = [];
        for (let i = 0; i < coords.length - 1; i++) {
            let newSideLength = Math.hypot(coords[i][0] - coords[i + 1][0], coords[i][1] - coords[i + 1][1]);
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