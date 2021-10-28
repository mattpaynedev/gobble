import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { Grommet } from 'grommet'
// import './index.css';
import App from './App';
import store from './store';
import Theme from './theme'



ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={Theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);