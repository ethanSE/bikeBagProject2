import React, { useState, useReducer, useEffect } from 'react';
import Header from './Header';
import Home from './Home';
import Account from './Account';
import CustomSpecification from './CustomSpecification';
import { ModeContext } from '../modeContext';
import { CustomSpecContext } from '../customSpecContext';


const initialCustomSpecUIState = {
  image: null,
  scale: null,
  shape: null,
  download: null
}

const initialCustomSpecState = {
  style: '',
  image: null,
  coords: null,
}

const customSpecUIReducer = (state, action) => {
  switch (action) {
    case 'image':
      return { ...state, image: 'active' }
    case 'scale':
      return {
        ...state,
        image: state.image === 'active' ? 'minimized' : null,
        scale: 'active'
      }
    default:
      throw new Error();
  }
}

const App = () => {
  //set up mode context
  const [activeMainComponent, setActiveMainComponent] = useState('home');
  const mode = { activeMainComponent, setActiveMainComponent };


  //set up customSpecContext
  const [customSpecState, setCustomSpecState] = useState(initialCustomSpecState);
  const [customSpecUIState, dispatch] = useReducer(customSpecUIReducer, initialCustomSpecUIState);
  const custom = { customSpecState, setCustomSpecState, customSpecUIState, dispatch };


  useEffect(() => {
    console.log(customSpecUIState);
  }, [customSpecUIState])

  const renderMainComponent = () => {
    // console.log('renderMainComponent ran')
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
        {renderMainComponent()}
      </CustomSpecContext.Provider>
    </ModeContext.Provider>
  )
}

export default App;