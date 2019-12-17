import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setScale } from './../actions'


function ScaleInput(props) {
    let canvasScaleRef = useRef();
    let scaleInputRef = useRef();
    let topTubePoints = [];
    let ctx;

    if (props.image.length && props.scale === 0) {
        var image = new Image();
        image.onload = function () {
            var windowWidth = window.innerWidth;
            canvasScaleRef.current.width = windowWidth * 0.8;
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
        if( topTubePoints.length < 2) { //if less than two points add a new point
            drawCircle(x,y);
            topTubePoints.push([x,y]);
        }
    }

    function setPixelToInchScale() {
        if (topTubePoints.length === 2) {
            let asq = (topTubePoints[0][0] - topTubePoints[1][0]) ** 2;
            let bsq = (topTubePoints[0][1] - topTubePoints[1][1]) ** 2;
            let csq = Math.sqrt(asq + bsq);
            let scale = (csq / scaleInputRef.value).toFixed(2);
            props.dispatch(setScale(scale));
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

    if (props.image.length && props.scale === 0) {
        return (
            <div className='scaleInput'>
                <form onSubmit={setPixelToInchScale} className='scaleInputForm'>
                    <input ref={(input) => { scaleInputRef = input }} placeholder='Top Tube Length in inches' type='number' />
                    <button className='button' type='submit'>Submit</button>
                    <button className='button' onClick={resetCoordinates}>Reset</button>
                </form>
                <canvas className='scaleInputCanvas' ref={canvasScaleRef} width='0' height='0' onClick={canvasScaleClick} />
            </div>
        )
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        scale: state.scale
    }
}

export default connect(mapStateToProps)(ScaleInput);