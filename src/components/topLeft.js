let array = [[2,4],[234,23551],[124,34]]
function TopLeft(array) {
    let lowestX = array[0][0];
    array.forEach((coord) => {
        if(coord[0] < lowestX){
            lowestX = coord[0];
        }
    });
    return lowestX;
}


// export default TopLeft;

// findLowestY

//     return shiftedArray;