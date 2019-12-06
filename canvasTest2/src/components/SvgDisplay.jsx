import React from 'react';
function SvgDisplay(props) {
    console.log(props)

    return(
        <p>hi</p>
    );
}

export default SvgDisplay;


//////



// let getPoints = function () {
//     console.log(coords)
//     let coords2 = [[0, 0], [120, 120], [120, 0]];
//     let coordString = "";
//     coords2.forEach(function (coord) {
//         coordString = coordString.concat(coord[0].toString() + "," + coord[1].toString() + " ");
//     });
//     console.log(coordString);
//     return (coordString);
// }


// let svgOutput =
//     <svg height="250" width="500">
//         <polygon points={getPoints()} style={canvasStyle} />
//     </svg>;