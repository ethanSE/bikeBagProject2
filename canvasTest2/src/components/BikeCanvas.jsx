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
            console.log(x);
            

        }

        var canvasStyle = {
            backgroundColor: 'blue'
        }
        return (
            <div>
                <input type='file' ref={this.fileInput} onChange={changeFunction}/>
                <canvas ref={this.canvas} width='0' height='0' style={canvasStyle} onClick={canvasClick.bind(this)}/>
            </div>
        );
    }
}
export default BikeCanvas;


