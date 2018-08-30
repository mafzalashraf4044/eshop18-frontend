import React from 'react'
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

//  views
import ClientHome from 'views/client';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ClientHome} />
      <Route exact path="/buy" component={ClientHome} />
      <Route exact path="/sell" component={ClientHome} />
      <Route exact path="/exchange" component={ClientHome} />
      <Route exact path="/fees" component={ClientHome} />
      <Route exact path="/faq" component={ClientHome} />
      <Route path="/dashboard" component={ClientHome} />
      <Redirect to="/" />
    </Switch>
  </Router>
);