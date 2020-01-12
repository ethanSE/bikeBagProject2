import React from 'react';
import { setActiveMainComponent } from './../actions';
import { connect } from 'react-redux';
import '../styles/Home.css';

function Home(props) {
    if (props.activeMainComponent === 'home') {
        return (
            <div className='home'>
                <h1>How it works</h1>
                <button className='button' onClick={() => { props.dispatch(setActiveMainComponent('custom')) }}> create custom bag</button>
                <div className='image1'/>
                <div className='image2'/>
                <div className='image3'/>
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
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return {
        image: state.image,
        activeMainComponent: state.activeMainComponent,
        user: state.user
    }
}

export default connect(mapStateToProps)(Home);