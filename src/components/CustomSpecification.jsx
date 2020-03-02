import React from 'react';
import StyleSelection from './StyleSelection';
import ShapeInput from './ShapeInput';
import ScaleInput from './ScaleInput';
import ImageUpload from './ImageUpload';
import Download from './Download';

const BikeCanvas = () => {
    return (
        <div className='customSpec'>
            <StyleSelection />
            {/* <ImageUpload /> */}
            {/* <ScaleInput />
            <ShapeInput />
            <Download /> */}
        </div>
    );
}

export default BikeCanvas;