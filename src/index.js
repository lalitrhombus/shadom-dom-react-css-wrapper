import React from 'react';
import ReactDOM from 'react-dom';
import './createShadowRoot';
import App from './App';
import * as serviceWorker from './serviceWorker';

const shadowRoot = document.getElementById('root').shadowRoot;
const reactRoot = document.createElement('div');
reactRoot.setAttribute('id', 'react-root');
shadowRoot.appendChild(reactRoot);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  reactRoot
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
