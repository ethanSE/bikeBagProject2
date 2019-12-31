import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { createAllSides, setActiveCustomSpecComponent } from './../actions'

function ShapeInput(props) {
    let canvasShapeRef = useRef();
    let shapeInputDivRef = useRef();
    
    if (props.customSpecUI.shape === 'active') {
        let coords = [];
        let xMin = 5000;
        let yMin = 5000;
        var ctx;

        if (props.scale) {
            var image = new Image();
            image.onload = function () {
                canvasShapeRef.current.width = shapeInputDivRef.current.clientWidth;
                canvasShapeRef.current.height = canvasShapeRef.current.width * (image.height / image.width);
                ctx = canvasShapeRef.current.getContext('2d');
                ctx.drawImage(image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height);
            }
            image.src = props.image;
        }

        function canvasShapeClick(evt) {
            let rect = canvasShapeRef.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            for (let i = 0; i < coords.length; i++) {
                let distance = Math.hypot(coords[i][0] - x, coords[i][1] - y);
                if (distance < 10) {
                    coords.push(coords[i]);
                    drawCircle(coords[i]);
                    drawLines();
                    return;
                };
            }
            coords.push([x, y]);
            drawCircle(x, y);
            drawLines();
        }

        function drawCircle(x, y) {
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
        }

        function shapeInputSubmit() {
            coords = xyMinTranslation(coords);
            props.dispatch(createAllSides(coords));
        }

        function xyMinTranslation(coords) {
            coords[coords.length - 1] = coords[0];
            yMin = Math.min(...(coords.map(c => c[1])));
            xMin = Math.min(...(coords.map(c => c[0])));

            let newCoords = coords.map((coord) => {
                return ([coord[0] - xMin, coord[1] - yMin])
            })
            return (newCoords);
        }

        function resetShape() {
            coords = [];
            ctx.drawImage(image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height);

        }

        function drawLines() {
            for (let i = 0; i < coords.length - 1; i++) {
                ctx.strokeStyle = "#FF0000";
                ctx.lineWidth = 3;
                ctx.moveTo(coords[i][0], coords[i][1]);
                ctx.lineTo(coords[i + 1][0], coords[i + 1][1]);
                ctx.stroke();
            }
        }
        //move a lot of logic to middleware
        
        return (
            <div className='shapeInputGrid customActive' ref={shapeInputDivRef}>
                <h3>Shape</h3>
                <button className='shapeInputButton button' onClick={shapeInputSubmit}>Submit Shape</button>
                <button className='shapeInputButton button' onClick={resetShape}>Reset Shape</button>
                <canvas className='shapeInputCanvas' ref={canvasShapeRef} width='0' height='0' onClick={canvasShapeClick} />
            </div>
        )
    } else if (props.customSpecUI.shape === 'minimized') {
        return (
            <div className='minimized' onClick={() => props.dispatch(setActiveCustomSpecComponent('shape'))}>
                <h3>Shape</h3>
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
export default connect(mapStateToProps)(ShapeInput);