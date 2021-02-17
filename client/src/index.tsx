import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './store';
import createHistory from 'history/createBrowserHistory';

import { createBrowserHistory } from 'history';

const history = createHistory();

export function nav(loc: string) {
  const history = createBrowserHistory({ forceRefresh: true });
  history.push(loc);
}

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
