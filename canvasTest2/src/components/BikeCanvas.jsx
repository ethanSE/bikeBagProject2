import React from 'react';
import bike from './bike.jpg';

class BikeCanvas extends React.Component {

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;

        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            ctx.font = "40px Courier"
            ctx.fillText(this.props.text, 210, 75)
        }
    }

    render () {
        return (
            <div>
                <img src={bike} />
                <canvas ref='canvas' width={640} height={400} />
                <img ref='image' src='https://www.planetx.co.uk/imgs/products/px/950x600_constWH/EBOOPICKRIV1_P1.jpg?v=6.1' className='hidden' alt='jnakjsdnskajun' />
            </div>
        );
    }
}
export default BikeCanvas;


