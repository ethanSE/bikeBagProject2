import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import About from './About';
import CustomSpecification from './CustomSpecification';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/custom' component={CustomSpecification} />
          <Route exact path='/' component={About} />
          {/* <Route exact path ='/howitworks' component={history} /> */}
        </Switch>
      </div>
    );
  }  
}

export default App;
