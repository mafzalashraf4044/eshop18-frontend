import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { Route, Switch, NavLink } from 'react-router-dom';

//  custom components
import Default from './Default';
import Buy from './Buy';
import Sell from './Sell';
import Exchange from './Exchange';
import OrdersHistory from './OrdersHistory';
import MyAccount from './MyAccount';
import EditProfile from './EditProfile';
import VerifyAccount from './VerifyAccount';
import ChangePassword from './ChangePassword';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/MainActionCreators';

//  styles
import './styles.scss';

class Dashboard extends React.PureComponent {
  render() {
    return (
      <div className="page-dashboard df jc-fs ai-fs">
        <ul className="dashboard-nav">
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard"><span>Dashboard</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/buy"><span>Buy</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/sell"><span>Sell</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/exchange"><span>Exchange</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/my-accounts"><span>My Accounts</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/orders-history"><span>Orders History</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/edit-profile"><span>Edit Profile</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/verify-account"><span>Verify Account</span></NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active" to="/dashboard/change-password"><span>Change Password</span></NavLink>
          </li>
        </ul>

        <div className="dashboard-content">
          <Switch>
            <Route exact path="/dashboard" component={Default} />
            <Route exact path="/dashboard/buy" component={Buy} />
            <Route exact path="/dashboard/sell" component={Sell} />
            <Route exact path="/dashboard/exchange" component={Exchange} />
            <Route exact path="/dashboard/orders-history" component={OrdersHistory} />
            <Route exact path="/dashboard/my-accounts" component={MyAccount} />
            <Route exact path="/dashboard/edit-profile" component={EditProfile} />
            <Route exact path="/dashboard/verify-account" component={VerifyAccount} />
            <Route exact path="/dashboard/change-password" component={ChangePassword} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;