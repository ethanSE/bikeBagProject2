import firebase from 'firebase';
import constants from './../constants';
const { firebaseConfig } = constants;

export const myFirebase = firebase.initializeApp(firebaseConfig);