import React from 'react';


class BikeCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.fileInput = React.createRef();
    }

    render () {
        var canvas = this.canvas;
        var img = null;
        var files = this.fileInput;
        let coords = [];

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
        }

        function drawCircle(x, y) {
            var ctx = canvas.current.getContext('2d');
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI);
            ctx.stroke();
        }

        var canvasStyle = {
            fill: 'red', 
            stroke: 'purple', 
            strokeWidth: 1
        }

        let getPoints = function() {
            return ("220,10 300,210 170,250 123,234 ");
        }
       
        return (
            <div>
                <input type='file' ref={this.fileInput} onChange={changeFunction}/>
                <canvas ref={this.canvas} width='0' height='0' onClick={canvasClick.bind(this)}/>
                <svg height="250" width="500">
                    <polygon points={getPoints()} style={canvasStyle} />
                </svg>
            </div>
        );
    }
}
export default BikeCanvas;