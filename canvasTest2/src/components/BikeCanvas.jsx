import React from 'react';
import StyleSelection from './StyleSelection';


class BikeCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.fileInput = React.createRef();
        this.svgActive = false;
        this.state = {
            coords: []
        }
    }

    render () {
        var canvas = this.canvas;
        var img = null;
        var files = this.fileInput;
        let coords = [];

        var canvasStyle = {
            fill: 'red',
            stroke: 'purple',
            strokeWidth: 1
        }

        function onImageLoad () {
            img = new Image();
            img.onload = drawImage;
            img.onerror = imageLoadFailed;
            img.src = URL.createObjectURL(files.current.files[0]);
        }

        function drawImage(){ //draw image to canvas
            console.log('draw running')
            console.log(img.width)
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            var ctx = canvas.current.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }

        function imageLoadFailed() {
            console.error("The provided file couldn't be loaded as an Image media");
        }

        function canvasClick(evt) {
            console.log('clicked');
            let rect = canvas.current.getBoundingClientRect();
            let x = (evt.clientX - rect.left);
            let y = (evt.clientY - rect.top);
            console.log(x, y);
            coords.push([x,y]);
            drawCircle(x,y);
            console.log(coords);
        }

        function drawCircle(x, y) {
            var ctx = canvas.current.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
        }

        return (
            <div className='canvas'>          
                <StyleSelection/>
                <input className='fileInput' type='file' ref={this.fileInput} onChange={onImageLoad} /> 
                <canvas ref={this.canvas} width='0' height='0' onClick={canvasClick.bind(this)}/>
                {/* <button onClick={setSvgActive}>Submit</button> */}
                {/* <SvgDisplay coords={coords}/> */}
            </div>
        );
    }
}
export default BikeCanvas;