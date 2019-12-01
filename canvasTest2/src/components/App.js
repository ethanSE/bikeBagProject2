import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BikeCanvas from './BikeCanvas';
//might be useful
// import { cloneDeep } from 'lodash';
// import { v4 } from 'uuid';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    //bind methods
  }

  //methods
  
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={BikeCanvas} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
