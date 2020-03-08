import React, { useRef, useContext, useEffect, useState } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import styles from '../styles/ScaleInput.module.css'

function debounce(fn, ms) {
    let timer
    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(this, arguments)
        }, ms)
    };
}

const ScaleInput = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [topTubePoints, setTopTubePoints] = useState([]);
    const { customSpecUIState, setCustomSpecState, customSpecState, dispatch } = useContext(CustomSpecContext)

    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let scaleInputDivRef = useRef();

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize)
        return () => {
            window.removeEventListener('resize', debouncedHandleResize)
        };
    })
    const debouncedHandleResize = debounce(() => setWindowWidth(window.innerWidth), 10)


    // useEffect(() => {
    //     topTubePoints.forEach((point) => drawCircle(point[0], point[1]));
    // }, [topTubePoints, windowWidth]);

    let ctx;

    if (customSpecState.image) {
        var image = new Image();
        image.onload = () => {
            canvasScaleRef.current.width = scaleInputDivRef.current.clientWidth;
            canvasScaleRef.current.height = canvasScaleRef.current.width * (image.height / image.width);
            ctx = canvasScaleRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height);
        }
        image.src = customSpecState.image;
    }

    const canvasScaleClick = (evt) => {
        let rect = canvasScaleRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        console.log(x, y)
        if (topTubePoints.length < 2) {
            console.log('hi')
            
            // drawCircle(x, y); have useEffect do drawing?
            setTopTubePoints([...topTubePoints, [x, y]]);
            console.log(topTubePoints)
        }
    }

    const setPixelToInchScale = (event) => {
        event.preventDefault();
        if (topTubePoints.length === 2) {
            let distance = Math.hypot(topTubePoints[0][0] - topTubePoints[1][0], topTubePoints[0][1] - topTubePoints[1][1])
            let scale = (distance / scaleInputRef.value);
        }
    }

    const drawCircle = (x, y) => {
        var ctx = canvasScaleRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }


    const resetCoordinates = () => {
        setTopTubePoints([]);
        ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height);
    }

    switch (customSpecUIState.scale) {
        case 'active':
            return (
                <div className='scaleInput customActive' ref={scaleInputDivRef}>
                    <h3>Scale</h3>
                    <form onSubmit={(event) => setPixelToInchScale(event)} className='scaleInputForm'>
                        <input ref={(input) => { scaleInputRef = input }} placeholder='Top Tube Length in inches' type='number' />
                        <button className='button' type='submit'>Submit</button>
                        <button className='button' onClick={resetCoordinates}>Reset</button>
                    </form>
                    <canvas className='scaleInputCanvas' ref={canvasScaleRef} width='0' height='0' onClick={canvasScaleClick} />
                </div>
            )
        case 'minimized':
            return (
                <div className='minimized' onClick={console.log()}>
                    <h3>Scale</h3>
                </div>
            )
        default:
            return null;
    }
}

export default ScaleInput;