import React from 'react';
import TopTube from '../assets/img/Toptube';
import Full from '../assets/img/Full';
import Front from '../assets/img/Front';
import { PropTypes } from 'prop-types';

function StyleSelection(props) {

    function clickFunction(e) {
        console.log(e.currentTarget.firstChild.innerHTML)
    }
    //not a good route but will work for now
    // pass this function down as a prop

    return (
        <div className='styleSelection grid-container'>
            <div className={'grid-item ' + props.active[0]} onClick={clickFunction}>
                <h4>Top Tube</h4>
                <TopTube className='bagIcon' />
            </div>
            <div className={'grid-item ' + props.active[1]} onClick={clickFunction}>
                <h4>Front</h4>
                <Front className='bagIcon'/>
            </div>
            <div className={'grid-item ' + props.active[2]} onClick={clickFunction}>
                <h4>Full</h4>
                <Full className='bagIcon' />
            </div>
        </div>
    )
}

StyleSelection.prototype = {
    active: PropTypes.array,
    onClick: PropTypes.func
}

export default StyleSelection;