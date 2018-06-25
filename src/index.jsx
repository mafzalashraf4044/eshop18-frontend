import React from 'react';
import ReactDOM from 'react-dom';

//  redux
import store from './redux';
import { Provider } from 'react-redux';

//  router
import Router from './router';

//  styles
import './styles/core.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);
