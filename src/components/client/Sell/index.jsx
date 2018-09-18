import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class Sell extends React.PureComponent {
  render() {
    return (
      <div className="page-sell">
        <div className="heading">
          <h1>How to place sell / withdrawal order?</h1>
        </div>
        <ul>
          <li>Please click on register button.</li>
          <li>Fill the registration form and finish the process.</li>
          <li>Login to your account by user email and password.</li>
          <li>Add an account of the Receiving / Payment Method by clicking My Accounts option in your dashboard section.</li>
          <li>Also add an account of the E-Currency which you want to sell / withdrawal by clicking My Accounts option in your dashboard section.</li>
          <li>Click sell / withdrawal option in the dashboard.</li>
          <li>Type sell / withdrawal amount then select Payment Method and E-currency.</li>
          <li>Click on Sell / Withdrawal button.</li>
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
          <li>After successful transaction you will receive your payment within 1-24 hours</li>
        </ul>
      </div>
    );
  }
}

export default Sell;