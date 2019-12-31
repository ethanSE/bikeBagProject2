import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setActiveCustomSpecComponent, setImageAndUpdateUI } from './../actions';

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
        props.dispatch(setImageAndUpdateUI(canvasDataUrl));
    }

    function imageLoadFailed() {
        console.error("The provided file couldn't be loaded as an Image media");
    }

    switch (props.customSpecUI.image) {
        case 'active':
            return (
                <div className='imageUpload customActive'>
                    <h3>Image Upload</h3>
                    {/* <div className='message'>
                        <p>upload a photo of your bike</p>
                    </div> */}
                    <label className='imageUploadButton button' htmlFor='file'><p>Upload Photo</p></label>
                    <input className='fileInput' type='file' name='file' id='file' ref={fileInput} onChange={onImageLoad} />
                    <canvas className='hidden' ref={uploadCanvas} width='' height='' />
                </div>
            );
        case 'minimized':
            return (
                <div className='minimized' onClick={() => props.dispatch(setActiveCustomSpecComponent('image'))}>
                    <h3>Image Upload</h3>
                </div>
            );
        default:
            return null;
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        style: state.style,
        customSpecUI: state.customSpecUI
    };
}

export default connect(mapStateToProps)(ImageUpload);

// props.dispatch(setActiveCustomSpecComponent('scale'));
// props.dispatch(setActiveCustomSpecComponent('shape'));

    //old render condition

    // if (!props.image.length && typeof props.style == 'number')
    //     {
    //     return (
    //         <div className='imageUpload'>
    //             <label className='imageUploadButton button' htmlFor='file'><p>Upload Photo</p></label>
    //             <input className='fileInput' type='file' name='file' id='file' ref={fileInput} onChange={onImageLoad} />
    //             <canvas className='hidden' ref={uploadCanvas} width='' height='' />
    //         </div>
    //     );
    // } else {
    //     return null;
    // }