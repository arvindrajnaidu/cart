import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function onOrderSubmitted() {
  debugger
}
ReactDOM.render(
  <React.StrictMode>
    <App onOrderSubmitted={onOrderSubmitted}/>
  </React.StrictMode>,
  document.getElementById('root')
);
