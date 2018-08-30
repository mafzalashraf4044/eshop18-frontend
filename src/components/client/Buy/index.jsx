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
          <h1>How to place buy order?</h1>
        </div>
        <ul>
          <li>Please click on signup button</li>
          <li>Fill the registration form and finish the process</li>
          <li>Login your account by user email and password</li>
          <li>Add E-currency account in my E-account option</li>
          <li>Click on place buy order option</li>
          <li>Type buy amount then select E-currency and payment by</li>
          <li>Click on preview and finally confirm order</li>
          <li>Check your mail inbox or spam folder for order details</li>
        </ul>

        <div className="heading">
          <h1>How to confirm order?</h1>
        </div>
        <ul>
          <li>First make payment as per order form instruction</li>
          <li>Go to current order list and click on order No. option</li>
          <li>Fill the form with payment information and click on confirm payment button</li>
        </ul>

        <div className="heading">
          <h1>When will deliver?</h1>
        </div>
        <ul>
          <li>After received Payment we will deliver within 1-24 hours</li>
        </ul>
      </div>
    );
  }
}

export default Buy;