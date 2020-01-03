import React from 'react';
import StyleSelection from './StyleSelection';
import ShapeInput from './ShapeInput';
import ScaleInput from './ScaleInput';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Download from './Download';

function BikeCanvas(props) {
    if (props.activeMainComponent === 'custom') {
        return (
            <div className='customSpec'>
                <StyleSelection />
                <ImageUpload />
                <ScaleInput />
                <ShapeInput />
                <Download />
            </div>
        );
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        scale: state.scale,
        coords: state.coords,
        activeMainComponent: state.activeMainComponent
    }
}

export default connect(mapStateToProps)(BikeCanvas);