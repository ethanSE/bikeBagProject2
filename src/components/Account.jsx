import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { sendNewUserToFirebase, signIn } from './../actions';
import { Redirect } from 'react-router-dom';

function Account(props) {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let reenterPasswordInputRef = useRef();
    const [ activeForm, setActiveForm ] = React.useState('signIn')

    function createAccountFormSubmit() {
        if(passwordInputRef.value === reenterPasswordInputRef.value) {
            props.dispatch(sendNewUserToFirebase(emailInputRef.value, passwordInputRef.value));
        } else {
            console.log('no');
        }
    }

    function signInFormSubmit() {
        props.dispatch(signIn(emailInputRef.value, passwordInputRef.value));
        passwordInputRef.value = '';
        emailInputRef.value = '';
    }

    let form = null;
    if(activeForm === 'signIn') {
        form = 
            <form onSubmit={signInFormSubmit} className='signInForm'>
                <input ref={(input) => { emailInputRef = input }} placeholder='Email' type='text' />
                <input ref={(input) => { passwordInputRef = input }} placeholder='password' type='password' />
            <button className='button accountButton' type='submit'>Sign In</button>
            </form>
    } else if (activeForm === 'createAccount') {
        form =
        <form onSubmit={createAccountFormSubmit} className='accountInputForm'>
            <input ref={(input) => { emailInputRef = input }} placeholder='Email' type='text' />
            <input ref={(input) => { passwordInputRef = input }} placeholder='password' type='password' />
            <input ref={(input) => { reenterPasswordInputRef = input }} placeholder='re-enter password' type='password' />
            <button className='button accountButton' type='submit'>Create Account</button>
        </form>
    }
    let button = <button className='button accountButton' onClick={() => setActiveForm('createAccount')}>Create Accout</button>
    
    if(activeForm === 'createAccount') {
        button = <button className='button accountButton' onClick={() => setActiveForm('signIn')}>Already have an account? -  Sign In</button>
    }

    if(props.user) {
        return (
            <Redirect to='/'/>
        );

    } else {
        return (
            <div className='account'>
                {form}
                {button}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
    }
}
export default connect(mapStateToProps)(Account);