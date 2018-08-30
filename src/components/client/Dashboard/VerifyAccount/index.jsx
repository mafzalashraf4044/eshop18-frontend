import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//  styles
import './styles.scss';

class VerifyAccount extends React.PureComponent {
  render() {
    return (
      <div className="dashboard-content-verify-account">
        <div className="heading df jc-fs ai-c">
          <FontAwesomeIcon icon={faUserShield} className="icon" />
          <h2>Account Verification</h2>
        </div>

        <p>To deal bank wire we follow KYC policy, client have to provide as bellows document</p>

        <ul>
          <li>Valid Passport or Driver License or National ID</li>
          <li>Address proof document (any utilities bill)</li>
          <li>Selfie with one hand ID/Passport</li>
          <li>Sender bank name and country</li>
        </ul>

        <p>
          Document scan must be color and clear, at least 300 dpi
          Please contact with Accounts Department if you want to deal bank wire.
        </p>
      </div>
    );
  }
}

export default VerifyAccount;