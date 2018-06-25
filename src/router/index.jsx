import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

//  views
import Home from 'views/Home';

export default () => (
  <Router>
    <Route exact path="/" component={Home}/>
  </Router>
);