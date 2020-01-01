import React from 'react';
import { setActiveMainComponent } from './../actions';
import { connect } from 'react-redux';
import { signOut } from '../actions';

function Header(props) {
    function signOutClick() {
        props.dispatch(signOut());
    }

    let account = <h3 onClick={() => props.dispatch(setActiveMainComponent('account'))}> Sign In </h3>
    if(props.user) {
        account = <h3 onClick={signOutClick}>Sign Out</h3>
    } 

    return (
        <div className='header'>
            <h1>Bike Frame Bag Designer</h1>
            {account}
            <h3 onClick={() => props.dispatch(setActiveMainComponent('custom'))}> Custom </h3>
            <h3 onClick={() => props.dispatch(setActiveMainComponent('home'))}> Home </h3>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);