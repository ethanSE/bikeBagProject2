import React from 'react';
import { connect } from 'react-redux';

function Home(props) {
    if (props.activeMainComponent === 'home') {
        return (
            <div className='grid-container-about'>
                <div className='heroDiv'>
                </div>

                <div className='inlinePhoto1 grid-item-about'>
                </div>

                <div className='textField1 grid-item-about'>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, totam pariatur dignissimos voluptate eius cumque et excepturi maiores! Sit omnis accusamus corporis unde assumenda ab nihil alias eligendi, itaque autem?</p>
                </div>

                <div className='inlinePhoto2 grid-item-about'>
                </div>

                <div className='textField2 grid-item-about'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, tempore reiciendis minus praesentium omnis recusandae earum a velit ducimus illum, aliquid facere veritatis, odit porro qui doloremque cum ipsa corporis!</p>
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