import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Account from './Account';
import CustomSpecification from './CustomSpecification';
import { ModeContext } from '../modeContext';

const App = () => {
  const [activeMainComponent, setActiveMainComponent] = useState('home');
  const mode = { activeMainComponent, setActiveMainComponent };

  const woo = () => {
    // console.log('woo ran')
    switch (mode.activeMainComponent) {
      case 'home':
        return <Home />
      case 'customSpec':
        return <CustomSpecification />
      case 'account':
        return <Account />
      default:
        console.log('default')
    }
  }

  return (
    <ModeContext.Provider value={mode}>
      <Header />
      {woo()}
    </ModeContext.Provider>
  )
}

export default App;