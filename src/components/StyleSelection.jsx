import React from 'react';
import TopTube from '../assets/images/Toptube';
import Full from '../assets/images/Full';
import Front from '../assets/images/Front';
import { connect } from 'react-redux'; 
import { setStyleUpdateUI } from './../actions';

function StyleSelection(props) {
    var activeArray = [null, null, null];
    if (props.style) {
        activeArray[props.style - 1] = 'active';
    }

    return (
        <div className='styleSelection styleContainer'>
            <div className={'styleItem ' + activeArray[0]} onClick={() => { props.dispatch(setStyleUpdateUI(1))}}>
                <h4>Top Tube</h4>
                <TopTube className='bagIcon' />
            </div>
            <div className={'styleItem ' + activeArray[1]} onClick={() => { props.dispatch(setStyleUpdateUI(2))}}>
                <h4>Front</h4>
                <Front className='bagIcon'/>
            </div>
            <div className={'styleItem ' + activeArray[2]} onClick={() => { props.dispatch(setStyleUpdateUI(3))}}>
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
export default connect(mapStateToProps)(StyleSelection);