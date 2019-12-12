import { combineReducers } from 'redux';
import scaleReducer from './scaleReducer';
import styleReducer from './styleReducer';
import coordsReducer from './coordsReducer';
import imageReducer from './imageReducer';
import svgStringReducer from './svgStringReducer';

const rootReducer = combineReducers({
    scale: scaleReducer,
    coords: coordsReducer,
    style: styleReducer,
    image: imageReducer,
    svgString: svgStringReducer
})

export default rootReducer;