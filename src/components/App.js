import React, { useState, useEffect } from 'react';
//hooks
import { useUIStateManager } from '../customHooks/useUIStateManager'
//context
import { ModeContext } from '../modeContext';
import { CustomSpecContext } from '../customSpecContext';
import { UserContext } from '../userContext';

//components
import Header from './Header';
import Home from './Home';
import CustomSpecification from './CustomSpecification';
import Account from './Account';

//aws
import Amplify from 'aws-amplify';
import config from '../aws-exports';
import { Auth, Hub } from 'aws-amplify';

Amplify.configure(config)

export default function App() {
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signOut") {
        setUser(null);
      } else if (event === 'signIn') {
        Auth.currentAuthenticatedUser().then(u => setUser(u))
      }
    });
  });

  const [customSpecUIState, setActiveCustomSpecPhase] = useUIStateManager();
  const custom = { customSpecState, setCustomSpecState, customSpecUIState, setActiveCustomSpecPhase };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ModeContext.Provider value={mode}>
        <CustomSpecContext.Provider value={custom}>
          <Header />
          <MainComponent mode={mode} />
        </CustomSpecContext.Provider>
      </ModeContext.Provider>
    </UserContext.Provider>
  )
}

const MainComponent = (props) => {
  switch (props.mode.activeMainComponent) {
    case 'home':
      return (<Home />)
    case 'customSpec':
      return <CustomSpecification />
    case 'account':
      return <Account />
    default:
      console.log('default')
  }
}