import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

const render = () => {
    ReactDOM.render(
        <App />
        , document.getElementById('root')
    );
};

render(App);