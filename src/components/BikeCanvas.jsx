import React, { useRef } from 'react';
import StyleSelection from './StyleSelection';
import { connect } from 'react-redux';
import ImageUpload from './ImageUpload';
// import { setImage } from './../actions';

//state
// coords: []
// scale
// style


// uistate 
//     styleSelected - show file upload
//     fileUploaded - show top tube length input
//     submitted - hide inputs (?)

function BikeCanvas(props) {
    var canvas = useRef();
    // var fileInput = useRef();
    var scaleInput = useRef();
    var img = null;
    let coords = [];
    var canvasDataUrl = null;

    // function onImageLoad() {
    //     img = new Image();
    //     img.onload = drawImage;
    //     img.onerror = imageLoadFailed;
    //     img.src = URL.createObjectURL(fileInput.current.files[0]);
    // }

    function drawImage() {
        var windowWidth = window.innerWidth;
        canvas.current.width = windowWidth * 0.8;
        canvas.current.height = canvas.current.width * (img.height / img.width);
        var ctx = canvas.current.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
        // canvasDataUrl = canvas.current.toDataURL('image/png');
        // props.dispatch(setImage(canvasDataUrl));
    }

    // function imageLoadFailed() {
    //     console.error("The provided file couldn't be loaded as an Image media");
    // }

    function canvasClick(evt) {;
        let rect = canvas.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        coords.push([x, y]);
        drawCircle(x, y);
    }

    function drawCircle(x, y) {
        var ctx = canvas.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    return (
        <div className='canvas'>
            <StyleSelection/>
            <ImageUpload />
            {/* <input className='fileInput' type='file' ref={fileInput} onChange={onImageLoad} /> */}
            <canvas ref={canvas} width='0' height='0' onClick={canvasClick.bind(this)} />
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