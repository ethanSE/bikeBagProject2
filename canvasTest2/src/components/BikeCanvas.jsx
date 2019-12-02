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
        var files = this.fileInput

        function changeFunction () {
            img = new Image();
            console.log(files.current.files[0])
            img.onload = draw;
            img.onerror = failed;
            img.src = URL.createObjectURL(files.current.files[0]);
        }

        function draw(){ //draw image to canvas
            console.log('draw running')
            canvas.current.width = 950;
            canvas.current.height = 600;
            var ctx = canvas.current.getContext('2d');
            ctx.drawImage(img, 0, 0);
        }

        function failed() {
            console.error("The provided file couldn't be loaded as an Image media");
        }

        function canvasClick() {
            console.log('clicked')
        }

        var canvasStyle = {
            backgroundColor: 'blue'
        }
        return (
            <div>
                <input type='file' ref={this.fileInput} onChange={changeFunction}/>
                <canvas ref={this.canvas} width='0' height='0' style={canvasStyle} onClick={canvasClick}/>
            </div>
        );
    }
}
export default BikeCanvas;


