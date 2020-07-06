import React, { useState } from 'react';
//hooks
import { useUIStateManager } from '../customHooks/useUIStateManager'
//context
import { ModeContext } from '../modeContext';
import { CustomSpecContext } from '../customSpecContext';

//components
import Header from './Header';
import Home from './Home';
import CustomSpecification from './CustomSpecification';

export default function App() {
  //set up mode context
  const [activeMainComponent, setActiveMainComponent] = useState('home');
  const mode = { activeMainComponent, setActiveMainComponent };

  //set up customSpecContext
  const [customSpecState, setCustomSpecState] = useState({
    style: '',
    image: null,
    scale: null,
    shape: null
  });
  
  const [customSpecUIState, setActiveCustomSpecPhase] = useUIStateManager();
  const custom = { customSpecState, setCustomSpecState, customSpecUIState, setActiveCustomSpecPhase };

  return (
    <ModeContext.Provider value={mode}>
      <CustomSpecContext.Provider value={custom}>
        <Header />
        <MainComponent mode={mode} />
      </CustomSpecContext.Provider>
    </ModeContext.Provider>
  )
}

const MainComponent = (props) => {
  switch (props.mode.activeMainComponent) {
    case 'home':
      return (<Home />)
    case 'customSpec':
      return <CustomSpecification />
    default:
      console.log('default')
  }
}