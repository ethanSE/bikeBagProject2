import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BikeCanvas from './BikeCanvas';
import Header from './Header';
import About from './About';

//might be useful
// import { cloneDeep } from 'lodash';
// import { v4 } from 'uuid';

class App extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  //   //bind methods
  // }

  //methods
  
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/custom' component={BikeCanvas} />
          <Route exact path='/' component={About} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
