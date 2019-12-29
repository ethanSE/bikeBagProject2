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
        myFirebase.auth().onAuthStateChanged(function (user) {
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