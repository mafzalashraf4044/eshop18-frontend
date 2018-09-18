import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class Buy extends React.PureComponent {
  render() {
    return (
      <div className="page-buy">
        <div className="heading">
          <h1>How to place buy / deposit order?</h1>
        </div>
        <ul>
          <li>Please click on register button.</li>
          <li>Fill the registration form and finish the process.</li>
          <li>Login to your account by user email and password.</li>
          <li>Add an account of the E-Currency which you want to buy / deposit by clicking My Accounts option in your dashboard section.</li>
          <li>Also add a payment method you want to use for buying / depositing the selected E-Currency from My Accounts section.</li>
          <li>Click buy / deposit option in the dashboard.</li>
          <li>Type buy / deposit amount then select E-currency and Payment Method.</li>
          <li>Click on Buy / Deposit button.</li>
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
          <li>After receiving the payment we will deliver the selected E-Currency within 1-24 hours</li>
        </ul>
      </div>
    );
  }
}

export default Buy;