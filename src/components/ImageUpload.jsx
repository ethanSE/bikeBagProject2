import React, { useRef } from 'react';
import { setImage } from './../actions';
import { connect } from 'react-redux';

function ImageUpload(props) {
    let fileInput = useRef();
    let uploadCanvas = useRef();
    var img = new Image();

    function onImageLoad() {
        
        img.onload = saveImage;
        img.onerror = imageLoadFailed;
        img.src = URL.createObjectURL(fileInput.current.files[0]);
    }

    function saveImage() {
        let ctx = uploadCanvas.current.getContext('2d');
        uploadCanvas.current.width = img.width;
        uploadCanvas.current.height = img.height;
        ctx.drawImage(img, 0, 0);
        let canvasDataUrl = uploadCanvas.current.toDataURL('image/png');
        props.dispatch(setImage(canvasDataUrl));
    }

    function imageLoadFailed() {
        console.error("The provided file couldn't be loaded as an Image media");
    }

    if (!props.image.length && typeof props.style == 'number')
        {
        return (
            <div>
                <input className='fileInput' type='file' ref={fileInput} onChange={onImageLoad} />
                <canvas className='hidden' ref={uploadCanvas} width='' height='' />
            </div>
        );
    } else {
        return null;
    } 
}

function mapStateToProps(state) {
    return {
        image: state.image,
        style: state.style
    };
}

export default connect(mapStateToProps)(ImageUpload);