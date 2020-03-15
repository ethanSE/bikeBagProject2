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
  scale: null,
  shape: null
}

const customSpecUIReducer = (state, action) => {
  switch (action) {
    case 'image':
      return {
        ...state,
        image: 'active',
        scale: state.scale === null ? null : 'minimized',
        shape: state.shape === null ? null : 'minimized',
        confirmation: state.confirmation == null ? null : 'minimized'
      }

    case 'scale':
      return {
        ...state,
        scale: 'active',
        image: 'minimized',
        shape: state.shape == null ? null : 'minimized',
        confirmation: state.confirmation == null ? null : 'minimized'
      }
    case 'shape':
      return {
        ...state,
        shape: 'active',
        image: 'minimized',
        scale: 'minimized',
        confirmation: state.confirmation == null ? null : 'minimized'
      }
    case 'confirmation':
      return {
        ...state,
        shape: 'minimized',
        scale: 'minimized',
        image: 'minimized',
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
    console.log(customSpecState)
  }, [customSpecState]);




  const renderMainComponent = () => {
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