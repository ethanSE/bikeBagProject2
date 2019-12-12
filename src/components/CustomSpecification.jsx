import React from 'react';
import StyleSelection from './StyleSelection';
import ShapeInput from './ShapeInput';
import ScaleInput from './ScaleInput';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Message from './Message';

function BikeCanvas(props) {
    return (
        <div className='canvas'>
            <StyleSelection />
            <Message />
            <ImageUpload />
            <ScaleInput />
            <ShapeInput />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        image: state.image,
        scale: state.scale
    }
}

export default connect(mapStateToProps)(BikeCanvas);