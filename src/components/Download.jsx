import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setSvgString } from './../actions'
import C2S from 'canvas2svg';

function Download(props) {
    let downloadCanvas = useRef();
    let svgString = '';
    let svgStringOutput = null;
    let outputCanvasWidth = 0;
    let outputCanvasHeight = 0;
    determineOutputCanvasSize();
    console.log(props.coords);

    if (props.svgString.length) {
        svgStringOutput = <p>{props.svgString.toString()}</p>
    }

    function determineOutputCanvasSize() {
        if(props.coords.length){
            props.coords[0].forEach((coord) => {
                if (coord[0] > outputCanvasWidth) {
                    outputCanvasWidth = coord[0]
                }
                if (coord[1] > outputCanvasHeight) {
                    outputCanvasHeight = coord[1]
                }
            });
        }  
    }
  
    function renderClicked() {
        if (props.coords.length) {
            var ctx = downloadCanvas.current.getContext('2d');
            console.log(props.coords[0])
            ctx.beginPath();
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.moveTo(props.coords[0][0][0], props.coords[0][0][1]);
            for (let i = 1; i < props.coords[0].length; i++) {
                ctx.lineTo(props.coords[0][i][0], props.coords[0][i][1]);
                ctx.moveTo(props.coords[0][i][0], props.coords[0][i][1]);
            }
            ctx.stroke();
        }
    }

    function downloadClicked() {
        if(props.coords.length) {
            //currently only works for one shape
            var ctx2 = new C2S(500, 500);
            if (props.coords) {
                props.coords.forEach((side) => {
                    ctx2.beginPath();
                    ctx2.strokeStyle = "#FF0000";
                    ctx2.lineWidth = 3;
                    ctx2.moveTo(side[0][0], side[0][1]);
                    for (let i = 1; i < side.length; i++) {
                        ctx2.lineTo(side[i][0], side[i][1]);
                        ctx2.moveTo(side[i][0], side[i][1]);
                    }
                    ctx2.stroke();
                })
                svgString = ctx2.getSerializedSvg(true);
                props.dispatch(setSvgString(svgString));
            }
        }        
    }

    return (
        <div>
            <button onClick={renderClicked}>Render</button>
            <button onClick={downloadClicked}>Download</button>
            <canvas className='outputCanvas' ref={downloadCanvas} width={outputCanvasWidth} height={outputCanvasHeight} />
            {svgStringOutput}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        coords: state.coords,
        scale: state.scale,
        image: state.image,
        svgString: state.svgString,
        dimensions: state.dimensions
    }
}
export default connect(mapStateToProps)(Download);

    //generate all shapes(?)
        //new reducer for making a big new state slice with all sides as objects(?)

    //shove left
    // let array = [[25, 4], [234, 23551], [124, 34]]
    // let lowestX = array[0][0];
    // array.forEach((coord) => {
    //     if (coord[0] < lowestX) {
    //         lowestX = coord[0];
    //     }
    //     console.log(lowestX)
    // });
    // array = array.map((coord) => [coord[0]-lowestX, coord[1]]);
    // console.log(array)
    //shove top
    //do for each shape
    //output a bunch of canvases(?) to show each side?
    // keep all seperate in a string?

//do in middleWare?