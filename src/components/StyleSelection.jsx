import React from 'react';
import TopTube from '../assets/images/Toptube';
import Full from '../assets/images/Full';
import Front from '../assets/images/Front';

function StyleSelection(props) {
    var activeArray = [null, null, null];
    if (props.style) {
        activeArray[props.style - 1] = 'active';
    }

    return (
        <div className='styleSelection styleContainer'>
            <div className={'styleItem ' + activeArray[0]} onClick={() => console.log()}>
                <h4>Top Tube</h4>
                <TopTube className='bagIcon' />
            </div>
            <div className={'styleItem ' + activeArray[1]} onClick={() => { console.log()}}>
                <h4>Front</h4>
                <Front className='bagIcon'/>
            </div>
            <div className={'styleItem ' + activeArray[2]} onClick={() => { console.log()}}>
                <h4>Full</h4>
                <Full className='bagIcon' />
            </div>
        </div>
    )
}
export default StyleSelection;