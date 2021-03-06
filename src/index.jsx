import React from 'react';
import ReactDOM from 'react-dom';

//  redux
import store from './redux';
import { Provider } from 'react-redux';

//  router
import Router from './router';

//  styles
import './styles/core.scss';
import './assets/icons/fontawesome.scss';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import 'loaders.css/src/animations/ball-grid-pulse.scss';

const favIcon = require('assets/images/fav.ico');

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);
