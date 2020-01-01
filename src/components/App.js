import React from 'react';
import Header from './Header';
import Home from './Home';
import Account from './Account';
import CustomSpecification from './CustomSpecification';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header/>
        <CustomSpecification/>
        <Home/>
        <Account/>
      </div>
    );
  }  
}

export default App;