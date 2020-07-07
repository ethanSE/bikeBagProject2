import React, { useRef, useContext, useEffect, useState } from 'react';
//hooks
import { useWindowWidth } from '../customHooks/useWindowWidth'
import styles from '../styles/ShapeInput.module.css'
//context
import { CustomSpecContext } from '../customSpecContext';
import { ModeContext } from '../modeContext';
import { UserContext } from '../userContext';
//actions
import { drawPoints, drawLines } from '../actions'
//graphql
import { API, graphqlOperation } from "aws-amplify";
import { createCustomDesign } from '../graphql/mutations'
//uuid
import { v4 as uuid } from 'uuid';

export default function ShapeInput() {
    const { customSpecUIState, setActiveCustomSpecPhase } = useContext(CustomSpecContext)

    switch (customSpecUIState.shape) {
        case 'active':
            return <ShapeInputActive />
        case 'minimized':
            return (
                <div className={styles.minimized} onClick={() => setActiveCustomSpecPhase('shape')}>
                    <h3>Shape</h3>
                </div>
            )
        default:
            return null;
    }
}

const ShapeInputActive = () => {
    const { setActiveMainComponent } = useContext(ModeContext)
    const [windowWidth] = useWindowWidth(50)
    const { customSpecState, setCustomSpecState, setActiveCustomSpecPhase } = useContext(CustomSpecContext);
    const [points, setPoints] = useState([]);
    const [sourceDimensions, setSourceDimensions] = useState(null);
    const { user } = useContext(UserContext);
    let canvasShapeRef = useRef();
    let shapeInputDivRef = useRef();
    let displayScaleFactor;

    //draws the image and points on the canvas when window width or points changes
    useEffect(() => {
        drawCanvas();
    }, [windowWidth, points])

    useEffect(() => {
        setTimeout(() => {
            window.scroll({
                top: shapeInputDivRef.current.offsetTop,
                behavior: "smooth",
            });
        }, 0);
    }, [])

    const drawCanvas = () => {
        let image = new Image();
        image.onload = () => {
            if (!sourceDimensions) setSourceDimensions({ imageHeight: image.height, imageWidth: image.width }); //saves image source dimensions on first load
            canvasShapeRef.current.width = shapeInputDivRef.current.clientWidth; //set width of canvas to be equal to its parent div
            displayScaleFactor = canvasShapeRef.current.width / image.width;
            canvasShapeRef.current.height = displayScaleFactor * image.height; //set height based on width and image ratio
            let ctx = canvasShapeRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height); //draws image on canvas
            drawPoints(canvasShapeRef, points, displayScaleFactor);
            drawLines(canvasShapeRef, points, displayScaleFactor);
        }
        image.src = customSpecState.image;
    }

    //allows users to reset
    const resetShape = () => {
        setPoints([]);
    }

    //allows users to submit
    const shapeInputSubmit = async () => {
        //do some kind of checking(?)
        //is shape closed?
        //number of points(?)
        // setCustomSpecState({
        //     ...customSpecState,
        //     shape: points
        // })
        await uploadDesign({
            ...customSpecState,
            shape: points
        });
        setActiveCustomSpecPhase('clear');
        setActiveMainComponent('account')
    }

    // allows user to select points
    const canvasShapeClick = (evt) => {
        //get display coordinate of click
        let rect = canvasShapeRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        //transform to source coordinate
        let xSourceCoord = x * sourceDimensions.imageWidth / canvasShapeRef.current.width;
        let ySourceCoord = y * sourceDimensions.imageHeight / canvasShapeRef.current.height;

        //--abstract away with hook(?)
        //check through existing points to see if click is on a previously selected point 
        //(ie. when closing the shape)
        for (let i = 0; i < points.length; i++) {
            let distance = Math.hypot(points[i][0] * displayScaleFactor - xSourceCoord * displayScaleFactor, points[i][1] * displayScaleFactor - ySourceCoord * displayScaleFactor);
            if (distance < 10) {        //i.e. if click is within drawn circle
                setPoints([...points, [points[i][0], points[i][1]]]); //add that same point to the array
                return;
            };
        }
        setPoints([...points, [xSourceCoord, ySourceCoord]]);
    }

    const uploadDesign = async (design) => {

        //graphql mutation
        console.log(design)
        console.log(user)

        // const newBag = {

        // }
        // const newDesignResult = await API.graphql(graphqlOperation(createCustomDesign, { input: newBag }));
        // console.log(newDesignResult)
    }

    return (
        <div className={styles.shapeInput} ref={shapeInputDivRef} style={{ minHeight: '50vh' }}>
            <h3>Shape</h3>
            <div className={styles.buttonRow}>
                <button className={styles.button} onClick={shapeInputSubmit}>Submit Design</button>
                <button className={styles.button} onClick={resetShape}>Reset Shape</button>
            </div>
            <canvas ref={canvasShapeRef} width='0' height='0' onClick={canvasShapeClick} />
        </div>
    )
}