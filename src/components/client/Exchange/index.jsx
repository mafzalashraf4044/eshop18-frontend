import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class Exchange extends React.PureComponent {
  render() {
    return (
      <div className="page-exchange">
        <div className="heading">
          <h1>How to place exchange order?</h1>
        </div>
        <ul>
          <li>Please click on register button.</li>
          <li>Fill the registration form and finish the process.</li>
          <li>Login to your account by user email and password.</li>
          <li>Add accounts of both the E-Currencies by clicking My Accounts option in your dashboard section.</li>
          <li>Click exchange option in the dashboard.</li>
          <li>Type exchange amount then select E-currencies.</li>
          <li>Click on Exchange button.</li>
          <li>Check your mail inbox or spam folder for order details.</li>
        </ul>

        <div className="heading">
          <h1>How to confirm order?</h1>
        </div>
        <ul>
          <li>First make payment as per order form instruction.</li>
          <li>Then check your email you will receive all other instructions via email.</li>
        </ul>

        <div className="heading">
          <h1>When will deliver?</h1>
        </div>
        <ul>
          <li>After successful transaction we will deliver the selected E-Currency withing 1-24 hours</li>
        </ul>
      </div>
    );
  }
}

export default Exchange;