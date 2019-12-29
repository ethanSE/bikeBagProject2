import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';

function Header(props) {
    function signOutClick() {
        props.dispatch(signOut());
    }

    if(props.user) {
        return (
            <div className='header'>
                <h1>Bike Frame Bag Designer</h1>
                <h3><Link to="/custom">Custom</Link> | <Link to="/">Home</Link> | <Link to='/' onClick={signOutClick}>Sign Out</Link></h3>
            </div>
        )
    } else {
        return (
            <div className='header'>
                <h1>Bike Frame Bag Designer</h1>
                <h3><Link to="/custom">Custom</Link> | <Link to="/">Home</Link> | <Link to="/account">Sign In / Create Account</Link></h3>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Header);

