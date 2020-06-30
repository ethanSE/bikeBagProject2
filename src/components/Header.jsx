import React, { useContext, useState, useEffect } from 'react';
import { ModeContext } from '../modeContext';
import styles from '../styles/Header.module.css';
import Amplify from 'aws-amplify';
import config from '../aws-exports';
import { Auth, Hub } from 'aws-amplify';

Amplify.configure(config)

export default function Header() {
    const { setActiveMainComponent } = useContext(ModeContext);

    return (
        <div className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.headerTitle}>Bike Frame Bag Designer</h1>
                <div className={styles.links}>
                    <SignInOutComponent />
                    <h3 onClick={() => setActiveMainComponent('customSpec')}> Custom </h3>
                    <h3 onClick={() => setActiveMainComponent('home')}> Home </h3>
                </div>
            </div>
        </div>
    )
}

const SignInOutComponent = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        Hub.listen("auth", ({ payload: { event, data } }) => {
            if (event === "signOut") {
                setUser(null);
            } else if (event === 'signIn') {
                setUser(Auth.currentAuthenticatedUser());
            }
        });
    });

    if (user) {
        return (<h3 onClick={() => Auth.signOut()}> Sign Out </h3>)
    } else {
        return (
            <h3 onClick={() => Auth.federatedSignIn()}> Sign In </h3>
        )
    }
}