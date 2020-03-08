import React, { useRef, useContext } from 'react';
import { CustomSpecContext } from '../customSpecContext';

const ScaleInput = () => {
    const { customSpecUIState, setCustomSpecState, customSpecState, dispatch } = useContext(CustomSpecContext)

    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let scaleInputDivRef = useRef();

    let topTubePoints = [];
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
        if (topTubePoints.length < 2) {
            drawCircle(x, y);
            topTubePoints.push([x, y]);
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
        topTubePoints = [];
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