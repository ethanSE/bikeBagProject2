import React, { useRef, useContext, useEffect, useState } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import { useWindowWidth } from '../customHooks/useWindowWidth'
import styles from '../styles/ShapeInput.module.css'

const ShapeInput = () => {
    const { customSpecUIState, dispatch } = useContext(CustomSpecContext)

    switch (customSpecUIState.shape) {
        case 'active':
            return <ShapeInputActive />
        case 'minimized':
            return (
                <div className={styles.shapeInput} onClick={() => dispatch('shape')}>
                    <h3>Shape</h3>
                </div>
            )
        default:
            return null;
    }
}
export default ShapeInput;

const ShapeInputActive = () => {
    const [windowWidth] = useWindowWidth(50)
    const { customSpecState, setCustomSpecState, dispatch } = useContext(CustomSpecContext);
    const [points, setPoints] = useState([]);
    const [sourceDimensions, setSourceDimensions] = useState(null);
    let canvasShapeRef = useRef();
    let shapeInputDivRef = useRef();
    let displayScaleFactor;

    //draws the image and points on the canvas when window width or points changes
    useEffect(() => {
        drawImageOnCanvas();
    }, [windowWidth, points])

    const drawImageOnCanvas = () => {
        let image = new Image();
        image.onload = () => {
            if (!sourceDimensions) setSourceDimensions({ imageHeight: image.height, imageWidth: image.width }); //saves image source dimensions on first load
            canvasShapeRef.current.width = shapeInputDivRef.current.clientWidth; //set width of canvas to be equal to its parent div
            displayScaleFactor = canvasShapeRef.current.width / image.width;
            canvasShapeRef.current.height = displayScaleFactor * image.height; //set height based on width and image ratio
            let ctx = canvasShapeRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height); //draws image on canvas
            drawPoints();
            drawLines();
        }
        image.src = customSpecState.image;
    }

    const drawPoints = () => {
        points.forEach(point => {
            drawCircle(point[0] * displayScaleFactor, point[1] * displayScaleFactor)
        })
    }

    const drawCircle = (x, y) => {
        let ctx = canvasShapeRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    const drawLines = () => {
        for (let i = 0; i < points.length - 1; i++) {
            let ctx = canvasShapeRef.current.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.moveTo(points[i][0] * displayScaleFactor, points[i][1] * displayScaleFactor);
            ctx.lineTo(points[i + 1][0] * displayScaleFactor, points[i + 1][1] * displayScaleFactor);
            ctx.stroke();
        }
    }

    //allows users to reset
    const resetShape = () => {
        setPoints([]);
    }
    //allows users to submit
    const shapeInputSubmit = () => {
        setCustomSpecState({
            ...customSpecState,
            shape: points
        })
        dispatch('confirmation');
    }

    // allows user to select points
    // translates display coords to source coords
    const canvasShapeClick = (evt) => {

        //get display coordinate of click
        let rect = canvasShapeRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);

        //transform to source coordinate
        let xSourceCoord = x * sourceDimensions.imageWidth / canvasShapeRef.current.width;
        let ySourceCoord = y * sourceDimensions.imageHeight / canvasShapeRef.current.height;

        //check through existing points to see if click is on a previously selected point 
        //(ie. when closing the shape)
        for (let i = 0; i < points.length; i++) {
            let distance = Math.hypot(points[i][0] * displayScaleFactor - xSourceCoord * displayScaleFactor, points[i][1] * displayScaleFactor- ySourceCoord * displayScaleFactor);
            if (distance < 10 ) {        //i.e. if click is within drawn circle
                setPoints([...points, [points[i][0], points[i][1]]]); //add that same point to the array
                return;
            };
        }
        setPoints([...points, [xSourceCoord, ySourceCoord]]);
    }

    return (
        <div className={styles.shapeInput} ref={shapeInputDivRef}>
            <h3>Shape</h3>
            <div className={styles.buttonRow}>
                <button className={styles.button} onClick={shapeInputSubmit}>Submit Shape</button>
                <button className={styles.button} onClick={resetShape}>Reset Shape</button>
            </div>
            <canvas ref={canvasShapeRef} width='0' height='0' onClick={canvasShapeClick} />
        </div>
    )
}