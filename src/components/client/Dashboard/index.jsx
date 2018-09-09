import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { Route, Switch, Link } from 'react-router-dom';

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

  componentDidMount() {
    this.props.getConfig().then((res) => {
      if (res.status === 200) {
        this.props.saveConfig(res.data.config);
      }
    }).catch((err) => {
      throw new Error(err);
    });
  }

  render() {
    return (
      <div className="page-dashboard df jc-fs ai-fs">
        <ul className="dashboard-nav">
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard'})} to="/dashboard"><span>Dashboard</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/buy'})} to="/dashboard/buy"><span>Buy / Deposit</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/sell'})} to="/dashboard/sell"><span>Sell / Withdrawal</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/exchange'})} to="/dashboard/exchange"><span>Exchange</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/my-accounts'})} to="/dashboard/my-accounts"><span>My Accounts</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/orders-history'})} to="/dashboard/orders-history"><span>Orders History</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/edit-profile'})} to="/dashboard/edit-profile"><span>Edit Profile</span></Link>
          </li>
          <li className="nav-item">
            <Link className={classNames({active: this.props.location.pathname === '/dashboard/change-password'})} to="/dashboard/change-password"><span>Change Password</span></Link>
          </li>
          {
            !this.props.user.isVerified &&
            <li className="nav-item">
              <Link className={classNames({active: this.props.location.pathname === '/dashboard/verify-account'})} to="/dashboard/verify-account"><span>Verify Account</span></Link>
            </li>
          }
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
            <Route exact path="/dashboard/change-password" component={ChangePassword} />
            <Route exact path="/dashboard/verify-account" component={VerifyAccount} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.MainReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  getConfig: () => dispatch(actions.getConfig()),
  saveConfig: config => dispatch(actions.saveConfig(config)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);