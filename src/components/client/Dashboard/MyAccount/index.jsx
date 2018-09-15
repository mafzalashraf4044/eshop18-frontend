import React from 'react';

//  third party libraries
import findIndex from 'lodash/findIndex';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import Select from 'react-select';

// custom component 
import ConfirmationModal from '../../common/ConfirmationModal';

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
      accountForDlt: null,
      width: window.innerWidth,
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    this.setState({
      eCurrencies: this.props.eCurrencies.map((eCurrency) => ({
        value: eCurrency.id, label: eCurrency.title,
      })),
      paymentMethods: this.props.paymentMethods.map((paymentMethod) => ({
        value: paymentMethod.id, label: paymentMethod.title,
      })),
    });

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

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth});
  }

  addAccount = () => {
    this.props.saveIsLoading(true);
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
          accounts: update(prevState.accounts, {$push: [res.data.account]}),
          responseMsg: {
            type: 'success',
            text: 'New account created successfully.',
          }
        }));
      }

      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);

      this.setState({
        responseMsg: {
          type: 'err',
          text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.',
        } 
      });
      
      throw new Error(err);
    });
  }

  editAccount = () => {
    this.props.saveIsLoading(true);

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

      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);

      this.setState({
        accountForEdit: update(prevState.accountForEdit, {responseMsg: {
          $set: {
            type: 'err',
            text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.',
          }
        }}),
      });

      throw new Error(err);
    });
  }

  dltAccount = () => {
    this.props.saveIsLoading(true);

    const dltAccountIndex = findIndex(this.state.accounts, account => account.id === this.state.accountForDlt.id);
    this.props.dltAccount(this.state.accountForDlt.id).then((res) => {
      if (res.status === 200) {
        this.setState(prevState => ({
          accountForDlt: null,
          accounts: update(prevState.accounts, {$splice: [[dltAccountIndex, 1]]}),
        }));
      }

      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);
      this.setState({
        responseMsg: {
          type: 'err',
          text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.',
        } 
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

  toggleEditModal = (accountForEdit = null) => {
    this.setState(prevState => ({
      accountForEdit,
    }));
  }

  toggleDltModal = (accountForDlt = null) => {
    this.setState({
      accountForDlt,
    });
  }

  renderAddEditAccountForm = (type) => {
    const accountState = type === 'addAccount' ? this.state : this.state.accountForEdit;

    if (this.state.activeTab === 'paymentmethod') {
      const paymentMethodIndex = type === 'addAccount' ?
      findIndex(this.props.paymentMethods, (paymentMethod) => paymentMethod.id === accountState.paymentMethod) : 
      findIndex(this.props.paymentMethods, (paymentMethod) => paymentMethod.id === accountState.paymentMethod.id);

      const isBankingEnabled = paymentMethodIndex !== -1 ? this.props.paymentMethods[paymentMethodIndex].isBankingEnabled : false;
      
      return  (
        <div className="form" key={type}>
          {
            type === 'addAccount' &&
            <div className="form-field">
              <label className="label">Payment Method:</label>
              <Select
                isClearable
                key="paymentMethod"
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                options={this.state.paymentMethods}
                onChange={(opt) => this.handleChange('paymentMethod', opt ? opt.value : '', type === 'editAccount')}
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
          <div className="btn-container" onClick={type === 'addAccount' ? this.addAccount : this.editAccount}>
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
                isClearable
                key="eCurrency"
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                options={this.state.eCurrencies}
                onChange={(opt) => this.handleChange('eCurrency', opt ? opt.value : '', type === 'editAccount')}
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
          <div className="btn-container" onClick={type === 'addAccount' ? this.addAccount : this.editAccount}>
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
                  <tr key={index}>
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
                      <button className="btn btn-default" onClick={() => this.toggleEditModal(paymentAccount)}>
                        <i className="fa fa-pencil-alt" />
                      </button>
                      <button className="btn btn-default no-border-left" onClick={() => this.toggleDltModal(paymentAccount)}>
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              }

              {
                paymentAccounts.length === 0 &&
                <tr>
                  <td colSpan={10} style={{textAlign: 'left'}}>Nothing to display.</td>
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
                  <tr key={index}>
                    <td>{eAccount.eCurrency.title}</td>
                    <td>{eAccount.accountName}</td>
                    <td>{eAccount.accountNum}</td>
                    <td>
                      <button className="btn btn-default" onClick={() => this.toggleEditModal(eAccount)}>
                        <i className="fa fa-pencil-alt" />
                      </button>
                      <button className="btn btn-default no-border-left" onClick={() => this.toggleDltModal(eAccount)}>
                        <i className="fa fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))
              }

              {
                eAccounts.length === 0 &&
                <tr>
                  <td colSpan={4} style={{textAlign: 'left'}}>Nothing to display.</td>
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
            {this.state.width > 480 && <i className="fa fa-university icon" />}
            <h2>Payment {this.state.width > 480 && 'Accounts'}</h2>
          </div>
          <div className={classNames('tab df jc-c ai-c', {active: this.state.activeTab === 'ecurrency'})} data-tab="ecurrency" onClick={this.setActiveTab}>
            {this.state.width > 480 && <i className="fa fa-money-check-alt icon" />}
            <h2>E-Accounts</h2>
          </div>
        </div>
        {
          this.state.activeTab === 'paymentmethod' ? this.renderPaymentAccounts() : this.renderEAccounts()
        }

        {
          this.state.accountForEdit &&
          <div className="modal-container df jc-c ai-c">
            <div className="modal-overlay" onClick={() => this.toggleEditModal(null)} />
            <div className="login-modal">
              <div className="heading df jc-sb ai-c">
                <h2>Edit Account</h2>
                <i className="fa fa-times icon" onClick={() => this.toggleEditModal(null)} />
              </div>

              {this.renderAddEditAccountForm('editAccount')}
            </div>
          </div>
        }

        {
          this.state.accountForDlt &&
          <ConfirmationModal
            title="Delete Account"
            confirmBtnTxt="Delete"
            toggleModal={this.toggleDltModal}
            confirmAction={this.dltAccount}
            confirmationTxt="Are you sure you want to delete this account?"
          />
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
  saveIsLoading: isLoading => dispatch(actions.saveIsLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);