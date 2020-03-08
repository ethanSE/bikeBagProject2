import React, { useRef, useContext, useState } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import styles from '../styles/ImageUpload.module.css';


const ImageUpload = () => {
    const { customSpecUIState, setCustomSpecState, customSpecState, dispatch } = useContext(CustomSpecContext)
    let fileInput = useRef();
    let uploadCanvas = useRef();
    var img = new Image();

    const onImageLoad = () => {
        console.log('image load start')
        img.onload = saveImage;
        img.onerror = imageLoadFailed;
        img.src = URL.createObjectURL(fileInput.current.files[0]);
    }

    const saveImage = () => {
        let ctx = uploadCanvas.current.getContext('2d');
        uploadCanvas.current.width = img.width;
        uploadCanvas.current.height = img.height;
        ctx.drawImage(img, 0, 0);
        let canvasDataUrl = uploadCanvas.current.toDataURL('image/png');
        setCustomSpecState({ ...customSpecState, image: canvasDataUrl })
        dispatch('scale');
    }

    const imageLoadFailed = () => {
        console.error("The provided file couldn't be loaded as an Image media");
    }

    switch (customSpecUIState.image) {
        case 'active':
            return (
                <div className={styles.imageUpload}>
                    <h3>Image Upload</h3>
                    <label className={styles.button} htmlFor='file'><p>Upload Photo</p></label>
                    <input className={styles.fileInput} type='file' name='file' id='file' ref={fileInput} onChange={onImageLoad} />
                    <canvas className={styles.hidden}
                        ref={uploadCanvas}
                        width=''
                        height='' />
                </div>
            );
        case 'minimized':
            return (
                <div className='minimized' onClick={dispatch('image')}>
                    <h3>Image Upload</h3>
                </div>
            );
        default:
            return null;
    }
}

export default ImageUpload;