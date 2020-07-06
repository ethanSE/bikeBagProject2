import React from 'react';
import StyleSelection from './StyleSelection';
import ImageUpload from './ImageUpload';
import ScaleInput from './ScaleInput';
import ShapeInput from './ShapeInput';
// import Download from './Download';
import styles from '../styles/CustomSpec.module.css';

const BikeCanvas = () => {
    return (
        <div className={styles.customSpecContainer}>
            <div className={styles.customSpecContents} >
                <StyleSelection />
                <ImageUpload />
                <ScaleInput />
                <ShapeInput />
                {/* <Download /> */}
            </div>
        </div>
    );
}

export default BikeCanvas;