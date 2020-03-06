import React, { useState } from 'react';
import Header from './Header';
import Home from './Home';
import Account from './Account';
import CustomSpecification from './CustomSpecification';
import { ModeContext } from '../modeContext';
import { CustomSpecContext } from '../customSpecContext';

const App = () => {
  //set up mode context
  const [activeMainComponent, setActiveMainComponent] = useState('home');
  const mode = { activeMainComponent, setActiveMainComponent };


  //set up customSpecContext
  const [style, setStyle] = useState(null);
  const custom = { style, setStyle };



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
      <CustomSpecContext.Provider value={custom}>
        <Header />
        {woo()}
      </CustomSpecContext.Provider>
    </ModeContext.Provider>
  )
}

export default App;