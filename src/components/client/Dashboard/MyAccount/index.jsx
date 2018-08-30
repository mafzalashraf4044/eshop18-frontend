import React from 'react';

//  third party libraries
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import Select from 'react-select';
import { faEdit, faUniversity, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class MyAccount extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      accountName: '',
      accountNum: '',
      paymentMethod: '',
      eCurrency: '',
      activeTab: 'paymentmethod',
      eCurrencies: [],
      paymentMethods: [],
      responseMsg: '',
      accounts: [],
    }
  }

  componentDidCatch(error, errorInfo) {
    throw new Error(error);
  }

  componentDidMount() {
    this.props.getAccounts().then((res) => {
      if (res.status === 200) {
        this.setState({
          accounts: res.data.accounts,
        });
      }
    }).catch((err) => {
      throw new Error(err);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      eCurrencies: nextProps.eCurrencies.map((eCurrency) => ({
        value: eCurrency.id, label: eCurrency.title,
      })),
      paymentMethods: nextProps.paymentMethods.map((paymentMethod) => ({
        value: paymentMethod.id, label: paymentMethod.title,
      })),
    });
  }

  addAccount = () => {
    this.props.addAccount({
      accountName: this.state.accountName,
      accountNum: this.state.accountNum,
      accountType: this.state.activeTab,
      paymentMethod: this.state.paymentMethod,
      eCurrency: this.state.eCurrency,
    }).then((res) => {
      if (res.status === 200) {
        this.setState(prevState => ({
          accountName: '',
          accountNum: '',
          paymentMethod: '',
          eCurrency: '',
          responseMsg: '',
          accounts: update(prevState.accounts, {$push: [res.data.account]}),
        }));
      }
    }).catch((err) => {
      this.setState({
        responseMsg: err.response.data.details || err.response.data.raw 
      });

      throw new Error(err);
    });
  }

  setActiveTab = (e) => {
    const activeTab = e.currentTarget.getAttribute('data-tab');

    this.setState({
      activeTab,
      accountName: '',
      accountNum: '',
      paymentMethod: '',
      eCurrency: '',
      responseMsg: '',
    });
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const accounts = _.compact(this.state.accounts.map((account) => {
      if (account.accountType === this.state.activeTab) {
        return (
          <tr>
            <td>{account.paymentMethod.title}</td>
            <td>{account.accountName}</td>
            <td>{account.accountNum}</td>
          </tr>
        )
      }

      return null;
    }));

    return (
      <div className="dashboard-content-my-account">
        <div className="tabs df jc-fs ai-c">
          <div className={classNames('tab df jc-c ai-c', {active: this.state.activeTab === 'paymentmethod'})} data-tab="paymentmethod" onClick={this.setActiveTab}>
            <FontAwesomeIcon icon={faUniversity} className="icon" />
            <h2>Payment Accounts</h2>
          </div>
          <div className={classNames('tab df jc-c ai-c', {active: this.state.activeTab === 'ecurency'})} data-tab="ecurency" onClick={this.setActiveTab}>
            <FontAwesomeIcon icon={faMoneyCheckAlt} className="icon" />
            <h2>E-Accounts</h2>
          </div>
        </div>

        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-condensed">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Acc. Name</th>
                  <th>Account #</th>
                </tr>
              </thead>
              <tbody>
                {accounts}

                {
                  accounts.length === 0 &&
                  <tr>
                    <td colSpan={3} style={{textAlign: 'left'}}>Nothing to display.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <div className="form">
            <div className="form-field">
              <label className="label">{this.state.activeTab === 'paymentmethod' ? 'Payment Method' : 'E-Currency'}:</label>
              <Select
                options={this.state.activeTab === 'paymentmethod' ? this.state.paymentMethods : this.state.eCurrencies}
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                onChange={(opt) => this.handleChange(this.state.activeTab === 'paymentmethod' ? 'paymentMethod' : 'eCurrency', opt.value)}
              />
            </div>
            <div className="form-field">
              <label className="label">Account Name:</label>
              <input type="text" name="accountName" value={this.state.accountName} onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            </div>
            <div className="form-field">
              <label className="label">Account Number:</label>
              <input type="text" name="accountNum" value={this.state.accountNum} onChange={(e) => this.handleChange(e.target.name, e.target.value)} />
            </div>
            {
              this.state.responseMsg &&
              <div className="err-msg">{this.state.responseMsg}</div>
            }
            <div className="btn-container" onClick={this.addAccount}>
              <button className="btn">Add Account</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.MainReducer.accounts,
  eCurrencies: state.MainReducer.eCurrencies,
  paymentMethods: state.MainReducer.paymentMethods,
});

const mapDispatchToProps = (dispatch) => ({
  getAccounts: () => dispatch(actions.getAccounts()),
  addAccount: account => dispatch(actions.addAccount(account)),
  editAccount: (id, account) => dispatch(actions.editAccount(id, account)),
  dltAccount: id => dispatch(actions.dltAccount(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);