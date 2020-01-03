import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { sendNewUserToFirebase, signIn, setActiveMainComponent } from './../actions';

function Account(props) {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let reenterPasswordInputRef = useRef();
    const [activeForm, setActiveForm] = React.useState('signIn')

    function createAccountFormSubmit(e) {
        e.preventDefault();
        if (passwordInputRef.value === reenterPasswordInputRef.value) {
            props.dispatch(sendNewUserToFirebase(emailInputRef.value, passwordInputRef.value));
        } else {
            console.log('no');
        }
    }

    function signInFormSubmit(e) {
        e.preventDefault();
        props.dispatch(signIn(emailInputRef.value, passwordInputRef.value));
        passwordInputRef.value = '';
        emailInputRef.value = '';
    }

    let form = (activeForm === 'signIn') ? (
        <form onSubmit={ e => signInFormSubmit(e)} className='signInForm'>
            <input ref={(input) => { emailInputRef = input }} placeholder='Email' type='text' />
            <input ref={(input) => { passwordInputRef = input }} placeholder='password' type='password' />
            <button className='button accountButton' type='submit'>Sign In</button>
            <button className='button accountButton' onClick={() => setActiveForm('createAccount')}>Create Accout</button>
        </form> 
    ) :  
        <form onSubmit={e => createAccountFormSubmit(e)} className='accountInputForm'>
            <input ref={(input) => { emailInputRef = input }} placeholder='Email' type='text' />
            <input ref={(input) => { passwordInputRef = input }} placeholder='password' type='password' />
            <input ref={(input) => { reenterPasswordInputRef = input }} placeholder='re-enter password' type='password' />
            <button className='button accountButton' type='submit'>Create Account</button>
            <button className='button accountButton' onClick={() => setActiveForm('signIn')}>Already have an account? -  Sign In</button>
        </form>
    
    if (props.activeMainComponent !== 'account') {
        return null;
    } else if (props.user) {
        props.dispatch(setActiveMainComponent('home'));
        return null;
    } else {
        return (
            <div className='account'>
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        activeMainComponent: state.activeMainComponent
    }
}
export default connect(mapStateToProps)(Account);