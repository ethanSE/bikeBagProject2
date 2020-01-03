import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setScaleAndUpdateUI, setActiveCustomSpecComponent } from './../actions'

function ScaleInput(props) {
    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let scaleInputDivRef = useRef();
    if (props.customSpecUI.scale === 'active') {
        let topTubePoints = [];
        let ctx;

        if (props.image.length) {
            var image = new Image();
            image.onload = function () {
                canvasScaleRef.current.width = scaleInputDivRef.current.clientWidth;
                canvasScaleRef.current.height = canvasScaleRef.current.width * (image.height / image.width);
                ctx = canvasScaleRef.current.getContext('2d');
                ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height);
            }
            image.src = props.image;
        }

        function canvasScaleClick(evt) {
            let rect = canvasScaleRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            if (topTubePoints.length < 2) {
                drawCircle(x, y);
                topTubePoints.push([x, y]);
            }
        }

        function setPixelToInchScale(event) {
            event.preventDefault();
            if (topTubePoints.length === 2) {
                let distance = Math.hypot(topTubePoints[0][0] - topTubePoints[1][0], topTubePoints[0][1] - topTubePoints[1][1])
                let scale = (distance / scaleInputRef.value);
                props.dispatch(setScaleAndUpdateUI(scale));
            }
        }

        function drawCircle(x, y) {
            var ctx = canvasScaleRef.current.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
        }
        function resetCoordinates() {
            topTubePoints = [];
            ctx.drawImage(image, 0, 0, canvasScaleRef.current.width, canvasScaleRef.current.height);
        }

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
    } else if (props.customSpecUI.scale === 'minimized') {
        return (
            <div className='minimized' onClick={() => props.dispatch(setActiveCustomSpecComponent('scale'))}>
                <h3>Scale</h3>
            </div>
        )
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        scale: state.scale,
        customSpecUI: state.customSpecUI
    }
}

export default connect(mapStateToProps)(ScaleInput);