import { combineReducers } from 'redux';
import scaleReducer from './scaleReducer';
import styleReducer from './styleReducer';
import coordsReducer from './coordsReducer';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
    scale: scaleReducer,
    coords: coordsReducer,
    style: styleReducer,
    image: imageReducer
})

export default rootReducer;