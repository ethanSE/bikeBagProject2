import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './index.css';
import thunkMiddleware from 'redux-thunk';
import middlewareLogger from './middleware/middlewareLogger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';
import { watchAuthState } from './actions';

const store = createStore(rootReducer, applyMiddleware(middlewareLogger, thunkMiddleware));
store.dispatch(watchAuthState());
const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>

            <Component />

        </Provider>,
        document.getElementById('root')
    );
};

render(App);