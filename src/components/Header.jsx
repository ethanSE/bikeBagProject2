import React, { useContext } from 'react';
import { ModeContext } from '../modeContext';
import styles from '../styles/Header.module.css';

const Header = () => {
    const { setActiveMainComponent } = useContext(ModeContext);
    let account = <h3  onClick={() => console.log()}> Sign In </h3>

    return (
        <div className={styles.header}>
            <h1 style={styles.headerTitle}>Bike Frame Bag Designer</h1>
            <div className={styles.links}>
                {account}
                <h3 onClick={() => setActiveMainComponent('customSpec')}> Custom </h3>
                <h3 onClick={() => setActiveMainComponent('home')}> Home </h3>
            </div>
        </div>
    )
}

export default Header;