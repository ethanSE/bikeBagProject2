import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './About';
import Account from './Account';
import CustomSpecification from './CustomSpecification';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/custom' component={CustomSpecification} />
          <Route exact path='/' component={Home} />
          <Route exact path='/account' component={Account} />
        </Switch>
      </div>
    );
  }  
}

export default App;
