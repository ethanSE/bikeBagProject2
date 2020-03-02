import React, { useContext } from 'react';
import { ModeContext } from '../modeContext';

const Home = () => {
    const { setActiveMainComponent } = useContext(ModeContext);
    return (
        <div className='home'>
            <h1>How it works</h1>
            <button className='button' onClick={() => setActiveMainComponent('customSpec')}> create custom bag</button>
            <div className='image1' />
            <div className='image2' />
            <div className='image3' />
            <div className='text text1'>
                <h3>Step 1</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis sequi optio asperiores sint aliquid in rem iure suscipit! Odit eum hic incidunt. Quidem corrupti expedita, officia doloremque praesentium maiores minima.</p>
            </div>
            <div className='text text2'>
                <h3>Step 2</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis cumque repellendus quidem? Facere, commodi unde beatae numquam, animi ratione consequuntur doloremque quia labore voluptates eius impedit officiis exercitationem doloribus sint?</p>
            </div>
            <div className='text text3'>
                <h3>Step 3</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis cumque repellendus quidem? Facere, commodi unde beatae numquam, animi ratione consequuntur doloremque quia labore voluptates eius impedit officiis exercitationem doloribus sint?</p>
            </div>
        </div>
    )
}

export default Home;