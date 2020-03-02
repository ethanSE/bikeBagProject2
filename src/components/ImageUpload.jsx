import React, { useRef } from 'react';

const ImageUpload = (props) => {
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
                <div className='minimized' onClick={console.log()}>
                    <h3>Image Upload</h3>
                </div>
            );
        default:
            return null;
    }
}

export default ImageUpload;