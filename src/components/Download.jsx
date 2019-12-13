import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { setSvgString } from './../actions'
import C2S from 'canvas2svg';

function Download(props) {
    let downloadCanvas = useRef();
    let svgString = '';
    let svgStringOutput = null;

    //generate all shapes(?)
        //new reducer for making a big new state slice with all sides as objects(?)

    //shove left
    let array = [[25, 4], [234, 23551], [124, 34]]
    let lowestX = array[0][0];
    array.forEach((coord) => {
        if (coord[0] < lowestX) {
            lowestX = coord[0];
        }
        console.log(lowestX)
    });
    array = array.map((coord) => [coord[0]-lowestX, coord[1]]);
    console.log(array)
    //shove top

    //do for each shape


    //output a bunch of canvases(?) to show each side?
    // keep all seperate in a string?


    if (props.svgString.length) {
        svgStringOutput = <p>{props.svgString.toString()}</p>
    }
    function clicked() {
        if (props.coords) {
            var ctx = downloadCanvas.current.getContext('2d');
            console.log(props.coords)
            ctx.beginPath();
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.moveTo(props.coords[0][0], props.coords[0][1]);
            for (let i = 1; i < props.coords.length; i++) {
                ctx.lineTo(props.coords[i][0], props.coords[i][1]);
                ctx.moveTo(props.coords[i][0], props.coords[i][1]);
            }
            ctx.stroke();
        }
    }

    function download() {
        var ctx = new C2S(500, 500);
        if (props.coords) {
            var ctx = downloadCanvas.current.getContext('2d');
            var ctx = C2S(500, 500);
            console.log(props.coords)
            ctx.beginPath();
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.moveTo(props.coords[0][0], props.coords[0][1]);
            for (let i = 1; i < props.coords.length; i++) {
                console.log('ok')
                ctx.lineTo(props.coords[i][0], props.coords[i][1]);
                ctx.moveTo(props.coords[i][0], props.coords[i][1]);
            }
            ctx.stroke();
            svgString = ctx.getSerializedSvg(true);
            console.log(props.coords)
            props.dispatch(setSvgString(svgString));
        }
    }

    return (
        <div>
            <canvas ref={downloadCanvas} width='800' height='800' />
            <button onClick={clicked}>Render</button>
            <button onClick={download}>Download</button>
            {svgStringOutput}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        coords: state.coords,
        scale: state.scale,
        image: state.image,
        svgString: state.svgString
    }
}
export default connect(mapStateToProps)(Download);