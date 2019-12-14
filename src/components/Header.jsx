import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
    return(
        <div className='header'>
            <h1>Bike Frame Bag Designer</h1>
            <Link to="/custom">Custom</Link> | <Link to="/Download">Download</Link>
        </div>
    )
}

export default Header;