import { combineReducers } from 'redux';
import scaleReducer from './scaleReducer';
import styleReducer from './styleReducer';
import coordsReducer from './coordsReducer';
import imageReducer from './imageReducer';
import svgStringReducer from './svgStringReducer';
import displayCanvasSizeReducer from './displayCanvasSizeReducer';
import userReducer from './userReducer';
import customSpecUIReducer from './customSpecUIReducer';

const rootReducer = combineReducers({
    scale: scaleReducer,
    coords: coordsReducer,
    style: styleReducer,
    image: imageReducer,
    svgString: svgStringReducer,
    dimensions: displayCanvasSizeReducer,
    user: userReducer,
    customSpecUI: customSpecUIReducer
});

export default rootReducer;