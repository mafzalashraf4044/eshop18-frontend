import React from 'react';

//  third party libraries
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import Select from 'react-select';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class MyAccount extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      accountName: '',
      accountNum: '',
      details: '',
      bankName: '',
      bankAddress: '',
      bankSwiftCode: '',
      paymentMethod: '',
      eCurrency: '',
      activeTab: 'paymentmethod',
      eCurrencies: [],
      paymentMethods: [],
      accounts: [],
      responseMsg: {type: '', text: ''},
      accountForEdit: null,
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
    const account = {
      accountName: this.state.accountName,
      accountNum: this.state.accountNum,
      accountType: this.state.activeTab,
    };
    
    if (this.state.activeTab === 'paymentmethod') {
      account.paymentMethod = this.state.paymentMethod,
      account.firstName = this.state.firstName;
      account.lastName = this.state.lastName;
      account.details = this.state.details;
      account.bankName = this.state.bankName;
      account.bankAddress = this.state.bankAddress;
      account.bankSwiftCode = this.state.bankSwiftCode;
    } else {
      account.eCurrency = this.state.eCurrency;
    }
    
    this.props.addAccount(account).then((res) => {
      if (res.status === 200) {
        this.setState(prevState => ({
          firstName: '',
          lastName: '',
          accountName: '',
          accountNum: '',
          details: '',
          bankName: '',
          bankAddress: '',
          bankSwiftCode: '',
          paymentMethod: '',
          eCurrency: '',
          accounts: update(prevState.accounts, {$push: [res.data.account]}),
          responseMsg: {
            type: 'success',
            text: 'New account created successfully.',
          }
        }));
      }
    }).catch((err) => {
      this.setState({
        responseMsg: {
          type: 'err',
          text: err.response.data.details || err.response.data.raw,
        } 
      });

      throw new Error(err);
    });
  }

  editAccount = () => {
    const editAccountIndex = findIndex(this.state.accounts, account => account.id === this.state.accountForEdit.id);
    const account = {
      accountName: this.state.accountForEdit.accountName,
      accountNum: this.state.accountForEdit.accountNum,
      accountType: this.state.accountForEdit.activeTab,
    };
    
    if (this.state.activeTab === 'paymentmethod') {
      account.firstName = this.state.accountForEdit.firstName;
      account.lastName = this.state.accountForEdit.lastName;
      account.details = this.state.accountForEdit.details;
      account.bankName = this.state.accountForEdit.bankName;
      account.bankAddress = this.state.accountForEdit.bankAddress;
      account.bankSwiftCode = this.state.accountForEdit.bankSwiftCode;
    }
    
    this.props.editAccount(this.state.accountForEdit.id, account).then((res) => {
      if (res.status === 200) {
        this.setState(prevState => ({
          accountForEdit: null,
          accounts: update(prevState.accounts, {$splice: [[editAccountIndex, 1, res.data.account]]}),
        }));
      }

    }).catch((err) => {
      this.setState({
        accountForEdit: update(prevState.accountForEdit, {responseMsg: {
          $set: {
            type: 'err',
            text: err.response.data.details || err.response.data.raw,
          }
        }}),
      });

      throw new Error(err);
    });
  }

  setActiveTab = (e) => {
    const activeTab = e.currentTarget.getAttribute('data-tab');

    this.setState({
      activeTab,
      firstName: '',
      lastName: '',
      accountName: '',
      accountNum: '',
      details: '',
      bankName: '',
      bankAddress: '',
      bankSwiftCode: '',
      paymentMethod: '',
      eCurrency: '',
      responseMsg: {type: '', text: ''},
    });
  }

  handleChange = (key, value, isEdit = false) => {
    if (!isEdit) {
      this.setState({
        [key]: value,
      });
    } else {
      this.setState(prevState => ({
        accountForEdit: update(prevState.accountForEdit, {[key]: {$set: value}}),
      }));
    }

  }

  toggleModal = (accountForEdit = null) => {
    this.setState(prevState => ({
      accountForEdit,
    }));
  }

  renderAddEditAccountForm = (type) => {
    const accountState = type === 'addAccount' ? this.state : this.state.accountForEdit;

    if (this.state.activeTab === 'paymentmethod') {
      const paymentMethodIndex = findIndex(this.props.paymentMethods, (paymentMethod) => paymentMethod.id === accountState.paymentMethod);
      const isBankingEnabled = paymentMethodIndex !== -1 ? this.props.paymentMethods[paymentMethodIndex].isBankingEnabled : false;
      
      return  (
        <div className="form" key={type}>
          {
            type === 'addAccount' &&
            <div className="form-field">
              <label className="label">Payment Method:</label>
              <Select
                key="paymentMethod"
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                options={this.state.paymentMethods}
                onChange={(opt) => this.handleChange('paymentMethod', opt.value, type === 'editAccount')}
              />
            </div>
          }
          {
            !isBankingEnabled ?
            <div>
              <div className="form-field">
                <label className="label">First Name:</label>
                <input type="text" name="firstName" value={accountState.firstName} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
              </div>
              <div className="form-field">
                <label className="label">Last Name:</label>
                <input type="text" name="lastName" value={accountState.lastName} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
              </div>
              <div className="form-field">
                <label className="label">City, State, Country, Post Code:</label>
                <input type="text" name="details" value={accountState.details} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
              </div>
            </div> :
            <div>
              <div className="two-columns df jc-sb ai-c">
                <div className="form-field">
                  <label className="label">Account Name:</label>
                  <input type="text" name="accountName" value={accountState.accountName} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
                </div>
                <div className="form-field">
                  <label className="label">Account Number:</label>
                  <input type="text" name="accountNum" value={accountState.accountNum} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
                </div>
              </div>
              <div className="two-columns df jc-sb ai-c">
                <div className="form-field">
                  <label className="label">Bank Name:</label>
                  <input type="text" name="bankName" value={accountState.bankName} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
                </div>
                <div className="form-field">
                  <label className="label">Bank Address:</label>
                  <input type="text" name="bankAddress" value={accountState.bankAddress} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
                </div>
              </div>
              <div className="form-field">
                <label className="label">Bank Swift Code:</label>
                <input type="text" name="bankSwiftCode" value={accountState.bankSwiftCode} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
              </div>
            </div>
          }

          {
            accountState.responseMsg && accountState.responseMsg.text &&
            <div className={classNames({'err-msg': accountState.responseMsg.type === 'err', 'success-msg': accountState.responseMsg.type === 'success'})}>{accountState.responseMsg.text}</div>
          }
          <div className="btn-container" onClick={type === 'addAccouont' ? this.addAccount : this.editAccount}>
            <button className="btn">{type === 'addAccount' ? 'Add Account' : 'Save Changes'}</button>
          </div>
        </div>
      );

    } else {

      return (
        <div className="form" key={type}>
          {
            type === 'addAccount' &&
            <div className="form-field">
              <label className="label">E-Currency:</label>
              <Select
                key="eCurrency"
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                options={this.state.eCurrencies}
                onChange={(opt) => this.handleChange('eCurrency', opt.value, type === 'editAccount')}
              />
            </div>
          }
          <div className="form-field">
            <label className="label">Account Name:</label>
            <input type="text" name="accountName" value={accountState.accountName} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
          </div>
          <div className="form-field">
            <label className="label">Account Number:</label>
            <input type="text" name="accountNum" value={accountState.accountNum} onChange={(e) => this.handleChange(e.target.name, e.target.value, type === 'editAccount')} />
          </div>
          {
            accountState.responseMsg && accountState.responseMsg.text &&
            <div className={classNames({'err-msg': accountState.responseMsg.type === 'err', 'success-msg': accountState.responseMsg.type === 'success'})}>{accountState.responseMsg.text}</div>
          }
          <div className="btn-container" onClick={type === 'addAccouont' ? this.addAccount : this.editAccount}>
            <button className="btn">{type === 'addAccount' ? 'Add Account' : 'Save Changes'}</button>
          </div>
        </div>
      );
    }
    
  }

  renderPaymentAccounts = () => {
    const paymentAccounts = this.state.accounts.filter(account => account.accountType === this.state.activeTab);

    return (
      <div className="tab-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-condensed">
            <thead>
              <tr>
                <th>Account</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Acc. Name</th>
                <th>Account #</th>
                <th>Details</th>
                <th>Bank Name</th>
                <th>Bank Address</th>
                <th>Bank Swift Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                paymentAccounts.map((paymentAccount, index) => (
                  <tr>
                    <td>{paymentAccount.paymentMethod.title}</td>
                    <td>{paymentAccount.firstName ? paymentAccount.firstName : '-'}</td>
                    <td>{paymentAccount.lastName ? paymentAccount.lastName : '-'}</td>
                    <td>{paymentAccount.accountName ? paymentAccount.accountName : '-'}</td>
                    <td>{paymentAccount.accountNum ? paymentAccount.accountNum : '-'}</td>
                    <td>{paymentAccount.details ? paymentAccount.details : '-'}</td>
                    <td>{paymentAccount.bankName ? paymentAccount.bankName : '-'}</td>
                    <td>{paymentAccount.bankAddress ? paymentAccount.bankAddress : '-'}</td>
                    <td>{paymentAccount.bankSwiftCode ? paymentAccount.bankSwiftCode : '-'}</td>
                    <td>
                      <button className="btn btn-default" onClick={() => this.toggleModal(paymentAccount)}>
                        <i className="fa fa-pencil-alt" />
                      </button>
                      <button className="btn btn-default no-border-left">
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              }

              {
                paymentAccounts.length === 0 &&
                <tr>
                  <td colSpan={9} style={{textAlign: 'left'}}>Nothing to display.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {this.renderAddEditAccountForm('addAccount')}

      </div>
    );
  }

  renderEAccounts = () => {
    const eAccounts = this.state.accounts.filter(account => account.accountType === this.state.activeTab);

    return (
      <div className="tab-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-condensed">
            <thead>
              <tr>
                <th>Account</th>
                <th>Acc. Name</th>
                <th>Account #</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                eAccounts.map((eAccount, index) => (
                  <tr>
                    <td>{eAccount.eCurrency.title}</td>
                    <td>{eAccount.accountName}</td>
                    <td>{eAccount.accountNum}</td>
                    <td>
                      <button className="btn btn-default" onClick={() => this.toggleModal(eAccount)}>
                        <i className="fa fa-pencil-alt" />
                      </button>
                      <button className="btn btn-default no-border-left">
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              }

              {
                eAccounts.length === 0 &&
                <tr>
                  <td colSpan={3} style={{textAlign: 'left'}}>Nothing to display.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        {this.renderAddEditAccountForm('addAccount')}

      </div>
    );
  }

  render() {
    return (
      <div className="dashboard-content-my-account">
        <div className="tabs df jc-fs ai-c">
          <div className={classNames('tab df jc-c ai-c', {active: this.state.activeTab === 'paymentmethod'})} data-tab="paymentmethod" onClick={this.setActiveTab}>
            <i className="fa fa-university icon" />
            <h2>Payment Accounts</h2>
          </div>
          <div className={classNames('tab df jc-c ai-c', {active: this.state.activeTab === 'ecurrency'})} data-tab="ecurrency" onClick={this.setActiveTab}>
            <i className="fa fa-money-check-alt icon" />
            <h2>E-Accounts</h2>
          </div>
        </div>
        {
          this.state.activeTab === 'paymentmethod' ? this.renderPaymentAccounts() : this.renderEAccounts()
        }

        {
          this.state.accountForEdit &&
          <div className="modal-container df jc-c ai-c">
            <div className="modal-overlay" onClick={() => this.toggleModal(null)} />
            <div className="login-modal">
              <div className="heading df jc-sb ai-c">
                <h2>Edit Account</h2>
                <i className="fa fa-times icon" onClick={() => this.toggleModal(null)} />
              </div>

              {this.renderAddEditAccountForm('editAccount')}
            </div>
          </div>
        }

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