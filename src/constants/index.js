import * as types from './ActionTypes';
import { initialState } from './InitialState';
import firebaseConfig from './firebaseConfig';

export default {
    firebaseConfig: firebaseConfig,
    initialState: initialState,
    types: types
};