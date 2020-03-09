import React, { useRef, useContext, useEffect, useState, useLayoutEffect } from 'react';
import { CustomSpecContext } from '../customSpecContext';
import styles from '../styles/ScaleInput.module.css'
import { Button } from 'react-bootstrap';

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
    const debouncedHandleResize = debounce(() => setWindowWidth(window.innerWidth), 100)

    useEffect(() => {
        if (customSpecState.image) {
            var image = new Image();
            image.onload = () => {
                canvasScaleRef.current.width = scaleInputDivRef.current.clientWidth; //* ratio added
                canvasScaleRef.current.height = canvasScaleRef.current.width * (image.height / image.width); //* ratio added
                let ctx = canvasScaleRef.current.getContext('2d');
                ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height);
            }
            image.src = customSpecState.image;
        }
    }, [windowWidth, topTubePoints])

    useEffect(() => {
        if (topTubePoints) {
            topTubePoints.forEach(point => drawCircle(point[0] * canvasScaleRef.current.width, point[1] * canvasScaleRef.current.height ))
        }
    }, [topTubePoints])


    const drawCircle = (x, y) => {
        console.log('draw circle running')
        console.log(x, y)
        let ctx = canvasScaleRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    const canvasScaleClick = (evt) => {
        if ( !topTubePoints) {
            let rect = canvasScaleRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            let xRatio = x / canvasScaleRef.current.width;
            let yRatio = y / canvasScaleRef.current.height;
            setTopTubePoints([xRatio, yRatio]);




        } else if (topTubePoints.length < 2 ){
            let rect = canvasScaleRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            let xRatio = x / canvasScaleRef.current.width;
            let yRatio = y / canvasScaleRef.current.height;
            setTopTubePoints([...topTubePoints, [xRatio, yRatio]]); // might not work on a null
        }
    }

    const resetCoordinates = () => {
        console.log('reset')
        setTopTubePoints(null);
    }

    const setPixelToInchScale = (event) => {
        event.preventDefault();
        // if (topTubePoints.length === 2) {
        //     let distance = Math.hypot(topTubePoints[0][0] - topTubePoints[1][0], topTubePoints[0][1] - topTubePoints[1][1])
        //     let scale = (distance / scaleInputRef.value);
        // }
    }

    switch (customSpecUIState.scale) {
        case 'active':
            return (
                <div className={styles.scaleInput} ref={scaleInputDivRef}>
                    <h3>Scale</h3>
                    <form onSubmit={(event) => setPixelToInchScale(event)} className={styles.scaleInputForm}>
                        <input ref={(input) => { scaleInputRef = input }} placeholder='Top Tube Length in inches' type='number' />
                        <button className={styles.button} type='submit'>Submit</button>
                        <button className={styles.button} onClick={resetCoordinates}>Reset</button>
                    </form>
                    <canvas ref={canvasScaleRef} width='0' height='0' onClick={canvasScaleClick} />
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