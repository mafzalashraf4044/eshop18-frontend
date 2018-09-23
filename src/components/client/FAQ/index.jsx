import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class FAQ extends React.PureComponent {
  render() {
    return (
      <div className="page-faq">
        <div className="faq-item">
          <h1>1. What is eBUYexhange.com?</h1>
          <p>We are certified exchanger with different E-currency / internet money services & deals with large scale transactions of E-Currencies.</p>
        </div>

        <div className="faq-item">
          <h1>2. How to register in eBUYexhange.com?</h1>
          <p>It`s very simple, Just click on Register then fill up form and follow instruction. To active your account click on activation link sent you by mail. you will find email on inbox or spam folder.</p>
        </div>

        <div className="faq-item">
          <h1>3. Where to send money?</h1>
          <p>After placing the order you will receive an email with order information (check your inbox or spam folder) then send money as per order form instructions provided in the email.</p>
        </div>

        <div className="faq-item">
          <h1>4. How much is the membership fee?</h1>
          <p>Membership to eshop18.com is free.</p>
        </div>

        <div className="faq-item">
          <h1>7. Can I pay by using my credit card?</h1>
          <p>No, currently we do not support this payment method.</p>
        </div>

        <div className="faq-item">
          <h1>8. Is it secure to work with eshop18.com?</h1>
          <p>Yes, our state of the art technology uses a number of security levels. The connection between the User and eshop18.com is encrypted using SSL protocol - an industry standard for the E-Commerce sites protection. All activities on our site are logged and you can always see when your last login was and from what IP address. All User passwords are encrypted to ensure confidentiality and security of your internet currency.net account. Our hosting provider uses modern methods to prevent "hacker" attacks.</p>
        </div>

        <div className="faq-item">
          <h1>9. Can I cancel an order?</h1>
          <p>You can cancel your order unless it has already been executed. Executed orders are not reversible (simply because it is impossible to do). After received fund if order cancel for any Problem or Fraud Activity we will deduct our commission/service charge and balance will back you.</p>
        </div>

        <div className="faq-item">
          <h1>10. Delivery & Payment Validity?</h1>
          <p>After received money we generally complete order within 4-7 working days. Sometime client send money and provide wrong Account No. which not possible to complete order. Even sometime they don`t contact with us. In this case we will wait up to 6 month for client reply, if no response within 6 month that fund will be frozen and not claimable for future!! </p>
        </div>
      </div>
    );
  }
}

export default FAQ;