import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import './index.css';
import { createStore } from 'redux';
import coordinatesReducer from './reducers/coordinatesReducer';
import { Provider } from 'react-redux';

const store = createStore(coordinatesReducer);

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