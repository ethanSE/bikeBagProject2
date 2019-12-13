import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import './index.css';
import thunkMiddleware from 'redux-thunk';
import middlewareLogger from './middleware/middlewareLogger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(middlewareLogger, thunkMiddleware));
const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Component />
            </HashRouter>
        </Provider>,
        document.getElementById('root')
    );
};

render(App);