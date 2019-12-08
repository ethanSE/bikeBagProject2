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
                <svg viewBox="0 0 409.6 405.76">
                    <path d="M682.8,396.06c50.72,0,91.84-48.13,91.84-107.49,0-82.33-41.12-107.49-91.84-107.49S591,206.24,591,288.57c0,59.36,41.12,107.49,91.84,107.49Zm0,0" transform="translate(-478 -181.08)" />
                    <path d="M885.6,554.28,839.27,449.9a23.3,23.3,0,0,0-10.48-11.15l-71.91-37.43a4.66,4.66,0,0,0-4.93.41,113.41,113.41,0,0,1-138.3,0,4.67,4.67,0,0,0-4.94-.41l-71.9,37.43a23.24,23.24,0,0,0-10.47,11.15L480,554.28a23.16,23.16,0,0,0,21.18,32.56H864.42a23.17,23.17,0,0,0,21.18-32.56Zm0,0" transform="translate(-478 -181.08)" />
                </svg>

            </div>
        );
    }
}
export default BikeCanvas;
