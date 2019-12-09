import React from 'react';
import TopTube from '../assets/img/Toptube';
import Full from '../assets/img/Full';
import Front from '../assets/img/Front';

function Header() {
    return (
        <div className='styleSelection grid-container'>
            <div className='grid-item'>
                <h4>Top Tube</h4>
                <TopTube className='bagIcon'/>
            </div>
            <div className='grid-item'>
                <h4>Front</h4>
                <Front className='bagIcon' />
            </div>
            <div className='grid-item'>
                <h4>Full</h4>
                <Full className='bagIcon' />
            </div>
        </div>
    )
}

export default Header;