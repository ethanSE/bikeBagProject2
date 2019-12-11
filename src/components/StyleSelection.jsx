import React from 'react';
import TopTube from '../assets/img/Toptube';
import Full from '../assets/img/Full';
import Front from '../assets/img/Front';
import { connect } from 'react-redux'; 
import { PropTypes } from 'prop-types';
import { setStyle } from './../actions';

function StyleSelection(props) {
    console.log(props)

    var activeArray = [null, null, null];
    if (props.style) {
        activeArray[props.style - 1] = 'active';
    }
    return (
        <div className='styleSelection grid-container'>
            <div className={'grid-item ' + activeArray[0]} onClick={() => {props.dispatch(setStyle(1))}}>
                <h4>Top Tube</h4>
                <TopTube className='bagIcon' />
            </div>
            <div className={'grid-item ' + activeArray[1]} onClick={() => {props.dispatch(setStyle(2))}}>
                <h4>Front</h4>
                <Front className='bagIcon'/>
            </div>
            <div className={'grid-item ' + activeArray[2]} onClick={() => {props.dispatch(setStyle(3))}}>
                <h4>Full</h4>
                <Full className='bagIcon' />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        style: state.style
    }
}


StyleSelection = connect(mapStateToProps)(StyleSelection);
export default StyleSelection;