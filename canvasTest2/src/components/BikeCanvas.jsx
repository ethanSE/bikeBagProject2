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

        function onImageLoad () {
            img = new Image();
            img.onload = drawImage;
            img.onerror = imageLoadFailed;
            img.src = URL.createObjectURL(files.current.files[0]);
        }

        function drawImage(){
            var windowWidth = window.innerWidth;
            canvas.current.width = windowWidth * 0.8;
            console.log('ratio', canvas.current.width * (img.height / img.width) )
            canvas.current.height = canvas.current.width * (img.height / img.width);
            var ctx = canvas.current.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
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

        var pathStyle = {            
            stroke: '#e08900',
            strokeWidth: 15,
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeOpacity: 1,
            strokeMiterlimit: 4,
            fillOpacity: 1
        }

        return (
            <div className='canvas'>          
                <StyleSelection/>
                
                <input className='fileInput' type='file' ref={this.fileInput} onChange={onImageLoad} /> 
                <canvas ref={this.canvas} width='0' height='0' onClick={canvasClick.bind(this)} />
                <input type='number'></input>
                {/* <button onClick={setSvgActive}>Submit</button> */}
            </div>
        );
    }
}
export default BikeCanvas;
