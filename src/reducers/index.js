import { combineReducers } from 'redux';
import scaleReducer from './scaleReducer';
import styleReducer from './styleReducer';
import coordsReducer from './coordsReducer';

const rootReducer = combineReducers({
    scale: scaleReducer,
    coords: coordsReducer,
    style: styleReducer
})

export default rootReducer;