import React, { useRef, useContext, useEffect, useState } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import { debounce } from '../actions';
import styles from '../styles/ScaleInput.module.css'

const ScaleInput = () => {
    const { customSpecUIState, dispatch } = useContext(CustomSpecContext)
    switch (customSpecUIState.scale) {
        case 'active':
            return <ScaleInputActive />
        case 'minimized':
            return (
                <div className={styles.minimized} onClick={() => dispatch('scale')}>
                    <h3>Scale</h3>
                </div>
            )
        default:
            return null;
    }
}

export default ScaleInput;

const ScaleInputActive = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [topTubePoints, setTopTubePoints] = useState([]);
    const [sourceDimensions, setSourceDimensions] = useState(null);
    const { setCustomSpecState, customSpecState, dispatch } = useContext(CustomSpecContext)
    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let scaleInputDivRef = useRef();
    let ctx;

    //sets up a listener to update state on window resize
    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize);
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        };
    }, [])

    const debouncedHandleResize = debounce(() => setWindowWidth(window.innerWidth), 50)

    //draws the image and points on the canvas when window width or points changes
    useEffect(() => {
        drawImageOnCanvas();
    }, [windowWidth, topTubePoints])


    //loads image onto canvas and calls drawTopTubePoints
    const drawImageOnCanvas = () => {
        let image = new Image();
        image.onload = () => {
            if (!sourceDimensions) setSourceDimensions({ imageHeight: image.height, imageWidth: image.width });
            let displayScaleFactor = scaleInputDivRef.current.clientWidth / image.width;
            canvasScaleRef.current.width = image.width * displayScaleFactor;
            canvasScaleRef.current.height = image.height * displayScaleFactor;
            ctx = canvasScaleRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height); //draws image on canvas
            drawTopTubePoints()
        }
        image.src = customSpecState.image;
    }

    //draws the points on the canvas
    const drawTopTubePoints = () => {
        topTubePoints.forEach(point => {
            drawCircle((point[0] * (canvasScaleRef.current.width / sourceDimensions.imageWidth)),
                (point[1] * (canvasScaleRef.current.height / sourceDimensions.imageHeight)))
        })
    }

    //draws a user-selected point on the canvas
    const drawCircle = (x, y) => {
        ctx = canvasScaleRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    //captures user click on the canvas and converts to pixel coordinates of original image
    const canvasScaleClick = (evt) => {
        let displayScaleFactor = scaleInputDivRef.current.clientWidth / sourceDimensions.imageWidth;
        if (topTubePoints.length < 2) {
            let rect = canvasScaleRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            let xSourceCoord = x / displayScaleFactor;
            let ySourceCoord = y / displayScaleFactor;
            if (topTubePoints.length == 1) {
                setTopTubePoints([topTubePoints[0], [xSourceCoord, ySourceCoord]]);
            } else {
                setTopTubePoints([[xSourceCoord, ySourceCoord]]);
            }
        }
    }

    //establishes a ratio of source image pixels to inches
    const setPixelToInchScale = (event) => {
        event.preventDefault();
        if (topTubePoints.length === 2) {
            let distance = Math.hypot(topTubePoints[0][0] - topTubePoints[1][0], topTubePoints[0][1] - topTubePoints[1][1])
            let scale = (distance / scaleInputRef.value);
            setCustomSpecState({ ...customSpecState, scale: scale })
            dispatch('shape');
        }
    }

    return (
        <div className={styles.scaleInput} ref={scaleInputDivRef}>
            <h3>Scale</h3>
            <form onSubmit={(event) => setPixelToInchScale(event)} className={styles.scaleInputForm}>
                <input ref={(input) => { scaleInputRef = input }} placeholder='Top Tube Length in inches' type='number' />
                <button className={styles.button} type='submit'>Submit</button>
                <button className={styles.button} onClick={() => setTopTubePoints([])}>Reset</button>
            </form>
            <canvas ref={canvasScaleRef} width='0' height='0' onClick={canvasScaleClick} />
        </div>
    )
}