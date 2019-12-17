import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
    var messageBody = null;
    if (typeof props.style != 'number') {
        messageBody = 'Select a style'
    } else if (typeof props.image != 'string'){
        messageBody = 'upload a photo of your bike'
    } else if (props.scale === 0){
        messageBody = 'specify scale. Select the ends of the top tube and enter the length';
    } else if (Object.keys(props.coords).length === 0) {
        messageBody = 'enter shape'
    } else if (props.scale !== 0) {
        messageBody = `${props.scale} pixels per inch`;
    }

    return (
        <div className='message'>
            <p>{messageBody}</p>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        style: state.style,
        image: state.image,
        scale: state.scale,
        coords: state.coords   
    }
}

export default connect(mapStateToProps)(Message);