import React from 'react';
import StyleSelection from './StyleSelection';
import ImageUpload from './ImageUpload';
import ScaleInput from './ScaleInput';
import ShapeInput from './ShapeInput';
import Download from './Download';
import styles from '../styles/CustomSpec.module.css';

const BikeCanvas = () => {
    return (
        <div className={styles.customSpec} >
            <StyleSelection />
            <ImageUpload />
            <ScaleInput />
            <ShapeInput />
            {/*<Download /> */}
        </div>
    );
}

export default BikeCanvas;