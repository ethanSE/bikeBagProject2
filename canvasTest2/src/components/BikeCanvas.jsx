import React from 'react';
import SvgDisplay from './SvgDisplay';


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

        function changeFunction () {
            img = new Image();
            img.onload = draw;
            img.onerror = failed;
            img.src = URL.createObjectURL(files.current.files[0]);
        }

        function draw(){ //draw image to canvas
            console.log('draw running')
            canvas.current.width = img.width;
            canvas.current.height = img.height;
            var ctx = canvas.current.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }

        function failed() {
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
            console.log(coords.toString())
        }

        function drawCircle(x, y) {
            var ctx = canvas.current.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
        }
        function setSvgActive() {
            setSvgActive = true;
        }

        let getPoints = function() {
            console.log(coords)
            let coords2 = [[0,0],[120,120],[120,0]];
            let coordString = "";
            coords2.forEach(function(coord){
                coordString = coordString.concat(coord[0].toString() + "," + coord[1].toString() + " ");
            });
            console.log(coordString);
            return (coordString);
        }
        let svgOutput = 
            <svg height="250" width="500">
                <polygon points={getPoints()} style={canvasStyle}/>
            </svg>;
        
        

        return (
            <div className='canvas'>
                <input type='file' ref={this.fileInput} onChange={changeFunction}/>           
                <canvas ref={this.canvas} width='0' height='0' onClick={canvasClick.bind(this)}/>
                <button onClick={setSvgActive}>Submit</button>
                <SvgDisplay coords={coords}/>
            </div>
        );
    }
}
export default BikeCanvas;