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
          <li>Please go to signup option</li>
          <li>Fill the registration form and finish the process</li>
          <li>Login your account by user email and password</li>
          <li>Add receiver/bank details in my banking account option</li>
          <li>Click on place exchange order option</li>
          <li>Type exchange amount then select e-currency and payment by</li>
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
      </div>
    );
  }
}

export default Exchange;