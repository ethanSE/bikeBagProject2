import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return(
        <div className='header'>
            <h1>Bike Frame Bag Designer</h1>
            <h3><Link to="/custom">Custom</Link> | <Link to="/">About</Link></h3>
        </div>
    )
}

export default Header;