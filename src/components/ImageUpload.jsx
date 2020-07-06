import React, { useRef, useContext, useEffect } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import styles from '../styles/ImageUpload.module.css';

export default function ImageUpload() {
    const { customSpecUIState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)

    switch (customSpecUIState.image) {
        case 'active':
            return <ImageUploadActive />
        case 'minimized':
            return (
                <div className={styles.minimized} onClick={() => setActiveCustomSpecPhase('image')}>
                    <h3>Image Upload</h3>
                </div>
            )
        default: return null
    }
}

const ImageUploadActive = () => {
    const { setCustomSpecState, customSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)
    let imageUploadActiveRef = useRef();
    let fileInput = useRef();
    let uploadCanvas = useRef();

    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: imageUploadActiveRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 0);
    }, [])

    var img = new Image();

    const onImageLoad = () => {
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
        setActiveCustomSpecPhase('scale');
    }

    const imageLoadFailed = () => {
        console.error("The provided file couldn't be loaded as an Image media");
    }
    return (
        <div className={styles.imageUpload} ref={imageUploadActiveRef}>
            <h3>Image Upload</h3>
            <label className={styles.button} htmlFor='file'><p>Upload Photo</p></label>
            <input className={styles.fileInput} type='file' name='file' id='file' ref={fileInput} onChange={onImageLoad} />
            <canvas className={styles.hidden}
                ref={uploadCanvas}
                width=''
                height='' />
        </div>
    )
}