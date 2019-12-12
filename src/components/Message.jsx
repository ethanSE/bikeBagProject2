import React from 'react';
import { connect } from 'react-redux';

function Message(props) {
    console.log(props.style)
    var messageBody = null;
    if (typeof props.style != 'number') {
        messageBody = 'Select a style'
    } else if (typeof props.image != 'string'){
        messageBody = 'upload a photo of your bike'
    } else if (typeof props.scale != 'number'){
        messageBody = 'specify scale';
    }


    return (
        <div className='message'>
            {messageBody}
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

