import React from 'react';
import StyleSelection from './StyleSelection';
import ShapeInput from './ShapeInput';
import ScaleInput from './ScaleInput';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Message from './Message';
import Download from './Download';

function BikeCanvas(props) {
    if(props.coords.length > 1) {
        return (
            <div>
                <Download />
            </div>
           
        )
    } else {
        return (
            <div className='customSpec'>
                <StyleSelection />
                <Message />
                <ImageUpload />
                <ScaleInput />                
                <ShapeInput /> 
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        scale: state.scale,
        coords: state.coords
    }
}

export default connect(mapStateToProps)(BikeCanvas);