import React from 'react';

class BikeCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.changeFunction = this.changeFunction.bind(this);
        this.fileInput = React.createRef();
        this.img = new Image();
    }

    changeFunction() {
        console.log(this);
        this.img.onload = this.draw();
        this.img.onerror = this.failed;
        this.img.src = URL.createObjectURL(this.fileInput.current.files[0]); 
    }

    draw(){ //draw image to canvas
        console.log('draw running')
        console.log(this)
        this.canvas.current.width = 950;
        this.canvas.current.height = 600;
        var ctx = this.canvas.current.getContext('2d');
        ctx.drawImage(this.img, 0, 0);
    }

    failed() {
        console.error("The provided file couldn't be loaded as an Image media");
    }

    render () {
        var canvasStyle = {
            backgroundColor: 'blue'
        }
        return (
            <div>
                <input type='file' ref={this.fileInput} onChange={this.changeFunction}/>
                <canvas ref={this.canvas} width='0' height='0' style={canvasStyle}/>
            </div>
        );
    }
}
export default BikeCanvas;


