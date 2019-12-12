import React, { useRef } from 'react';
import StyleSelection from './StyleSelection';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
import Message from './Message';

//state
// coords: []
// scale
// style


// uistate 
//     styleSelected - show file upload
//     fileUploaded - show top tube length input
//     submitted - hide inputs (?)

function BikeCanvas(props) {
    var canvasRef = useRef();
    // var fileInput = useRef();
    var scaleInput = useRef();
    var img = null;
    let coords = [];

    function canvasClick(evt) {
        ;
        let rect = canvasRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        coords.push([x, y]);
        drawCircle(x, y);
    }

    function drawCircle(x, y) {
        var ctx = canvasRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    let canvas = null;
    if (props.image.length) {
        var image = new Image();
        image.onload = function () {
            var windowWidth = window.innerWidth;
            canvasRef.current.width = windowWidth * 0.8;
            canvasRef.current.height = canvasRef.current.width * (image.height / image.width);
            var ctx = canvasRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
        }
        image.src = props.image;
    }

    return (
        <div className='canvas'>
            <StyleSelection />
            <Message />
            <ImageUpload />
            <canvas ref={canvasRef} width='0' height='0' onClick={canvasClick} />
            {canvas}
            {/* <input ref={scaleInput} type='number'/> */}
        </div>
    );
}

function mapStateToProps(state) {
    return {
        image: state.image
    }
}

export default connect(mapStateToProps)(BikeCanvas);