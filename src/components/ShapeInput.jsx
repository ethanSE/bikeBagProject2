import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setCoordinates } from './../actions'

function ShapeInput(props) {
    let canvasShapeRef = useRef();
    let coords = [];
    let xMin = 5000;
    let yMin = 5000;

    if (props.scale) {
        var image = new Image();
        image.onload = function () {
            var windowWidth = window.innerWidth;
            canvasShapeRef.current.width = windowWidth * 0.8;
            canvasShapeRef.current.height = canvasShapeRef.current.width * (image.height / image.width);
            var ctx = canvasShapeRef.current.getContext('2d');
            ctx.drawImage(image, 0, 0, canvasShapeRef.current.width, canvasShapeRef.current.height);
        }
        image.src = props.image;
    }

    function canvasShapeClick(evt) {
        let rect = canvasShapeRef.current.getBoundingClientRect();
        let x = (evt.clientX - rect.left);
        let y = (evt.clientY - rect.top);
        coords.push([x, y]);
        drawCircle(x, y);
    }

    function drawCircle(x, y) {
        var ctx = canvasShapeRef.current.getContext('2d');
        ctx.strokeStyle = "#FF0000";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function shapeInputSubmit() {
        coords = xyMinTranslation(coords);
        props.dispatch(setCoordinates(coords));
    }

    function xyMinTranslation(coords){
        xMin = yMin = 5000;
        coords.forEach((coord) => {
            console.log(coord)
            if(coord[0] < xMin) {
                xMin = coord[0];
            }
            if(coord[1] < yMin) {
                yMin = coord[1];
            }
        });
        coords.forEach((coord) =>{
            coord[0] = coord[0] - xMin;
            coord[1] = coord[1] - yMin;
        })
        return(coords);
    }

    if (props.scale) {
        return (
            <div>
                <canvas ref={canvasShapeRef} width='0' height='0' onClick={canvasShapeClick} />
                <button onClick={shapeInputSubmit}>Submit Shape</button>
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
export default connect(mapStateToProps)(ShapeInput);