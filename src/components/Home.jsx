import React, { useContext } from 'react';
import { ModeContext } from '../modeContext';
import styles from '../styles/Home.module.css';
import Upload from  '../assets/images/cloud-upload-outline.js'

const Home = () => {
    const { setActiveMainComponent } = useContext(ModeContext);
    return (
        <div className={styles.home}>
            <h1>How it works</h1>
            <div className={styles.flexWrapContainer}>

                <div className={styles.row}>
                    <div className={styles.icon}><Upload /></div>
                    
                    <div className={styles.text}>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis sequi optio asperiores sint aliquid in rem iure suscipit! Odit eum hic incidunt. Quidem corrupti expedita, officia doloremque praesentium maiores minima.</p>
                    </div>
                </div>
                
                <div className={styles.row}>
                    <div className={styles.image} />
                    <div className={styles.text}>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis cumque repellendus quidem? Facere, commodi unde beatae numquam, animi ratione consequuntur doloremque quia labore voluptates eius impedit officiis exercitationem doloribus sint?</p>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.image} />
                    <div className={styles.text}>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis cumque repellendus quidem? Facere, commodi unde beatae numquam, animi ratione consequuntur doloremque quia labore voluptates eius impedit officiis exercitationem doloribus sint?</p>
                    </div>
                </div>
            </div>
            <button className='button' onClick={() => setActiveMainComponent('customSpec')}> create custom bag</button>
        </div>
    )
}

export default Home;