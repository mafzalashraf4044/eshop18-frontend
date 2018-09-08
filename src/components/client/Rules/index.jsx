import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class Rules extends React.PureComponent {
  render() {
    return (
      <div className="page-rules">
        <p>Use of any www.eBUYexchange.com service means user accepts all the terms and conditions. It describes user's rights and obligations when using these services. User should read it carefully: </p>

        <div className="rule-item">
          <h1>Important Legal Information: </h1>
          <ol>
            <li>All www.eBUYexchange.com member is solely responsible to offer valid and accurate information needed to complete the orders.</li>
            <li>The www.eBUYexchange.com member answer for all payments by themselves, even if the instructions provided by user are incorrect.</li>
            <li>Payment may not be counterfeit or otherwise fraudulent. The user agrees that any attempt to remit fraudulent funds will result in prosecution to the fullest extent of the law and the notification of the general public of user's actions via posting on the www.eBUYexchange.com website, public and private discussion boards or by any other means, at www.eBUYexchange.com discretion.</li>
            <li>We reserve the right to refuse service to particular individuals or entities, at our sole discretion, with or without cause. NO correspondence will be entered into.</li>
            <li>We reserve the right to report any fraudulent activity to the appropriate authorities.</li>
            <li>We recommend our members supply a valid landline telephone number in which www.eBUYexchange.com staff can call to verify membership contact and order details. We reserve the right to cancel pending orders if we are unable to make contact for some disputed order. Mobile phone numbers are not suggested. This is a due diligence requirement to avoid fraud.</li>
            <li>www.eBUYexchange.com will not be responsible for delays or failures in the transmission, receipt or execution of orders, remittances, payments, or information due to events or systems beyond its control. www.eBUYexchange.com owners, employees, agents or affiliates will not be responsible for any loss, damage or injury resulting from any event or system beyond its control.</li>
            <li>www.eBUYexchange.com will not accept third party payment, if we find the fund comes from other people, we will not pickup the money and will directly reject your order.</li>
          </ol>
        </div>

        <div className="rule-item">
          <h1>Account Eligibility: </h1>
          <p>Users must give us the correct account number and other right personal information.All the transfer of digital gold currency into wrong digital gold currency accounts due to wrong account numbers given by the user are not reversible. We have no powers to retrieve Digital Gold Currency placed in another users account.</p>
        </div>

        <div className="rule-item">
          <h1>Fees: </h1>
          <p>There is no charge to open an www.eBUYexchange.com account, nor storage and annual fee to be charged. www.eBUYexchange.com, whereas, reserves the right to assess and collect fees for its services. All fees are disclosed on the www.eBUYexchange.com website and automatically are calculated and publicized before User confirms an Exchange order. www.eBUYexchange.com is entitled to change its fees prospectively at any time and at its sole judgement.</p>
        </div>

        <div className="rule-item">
          <h1>Identifying Information: </h1>
          <p>User must provide www.eBUYexchange.com with valid and accurate identifying information as determined from time to time by www.eBUYexchange.com.</p>
        </div>

        <div className="rule-item">
          <h1>Protection of Passphrase: </h1>
          <p>To give access to www.eBUYexchange.com services, User is responsible for protecting user's Passphrase. In the event of the loss or misuse of user's Passphrase, www.eBUYexchange.com disclaims all liability for such loss. <br /><br /> User must not divulge user's Passphrase to anyone else, nor may User use anyone else Passphrase. User agrees that www.eBUYexchange.com will treat any person accessing www.eBUYexchange.com using user's Passphrase as the User.</p>
        </div>

        <div className="rule-item">
          <h1>www.eBUYexchange.com Order Provisions: </h1>
          <p>User is solely responsible to provide valid and accurate information needed to complete www.eBUYexchange.com orders. <br /><br /> User is solely responsible for all Payments, even if the instructions provided by User are incorrect.</p>
        </div>

        <div className="rule-item">
          <h1>www.eBUYexchange.com Remittance Provisions: </h1>
          <p>Remittance from customer will be received 4-7 days. Upon receipt of remittance, all orders will be processed within 30 Min (Except holiday day). <br /><br /> Remittance must be good funds of the exact amount specified in www.eBUYexchange.com order, net of all fees. <br /><br /> If User fails to Remit good funds of the exact amount specified in www.eBUYexchange.com order, net of all fees, www.eBUYexchange.com, at its sole discretion, may:</p>

          <ol>
            <li>Reduce the www.eBUYexchange.com order to the amount of funds received.</li>
            <li>Enter a new www.eBUYexchange.com order for the net amount of funds received at the Exchange rate applicable at the time of the entry of the new www.eBUYexchange.com order.</li>
            <li>Cancel the www.eBUYexchange.com order as provided,net of all fees.</li>
          </ol>

          <p>If User Remits more than the necessary amount of good funds necessary to fulfill www.eBUYexchange.com order, net of all fees, www.eBUYexchange.com, at its sole discretion, may: </p>

          <ol>
            <li>Adjust the www.eBUYexchange.com order to the exact amount of funds received.</li>
            <li>Enter a new www.eBUYexchange.com order for the amount of the excess funds received at the Exchange rate applicable at the time of the entry of the new www.eBUYexchange.com order.</li>
            <li>Return the excess funds received to User,net of all fees.</li>
          </ol>

          <p>Remittances are final and not reversible except as provided in the term.</p>
        </div>

      </div>
    );
  }
}

export default Rules;