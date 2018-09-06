import React from 'react';

//  third party libraries
import cloneDeep from 'lodash/cloneDeep';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

//  styles
import './styles.scss';

const buy = {
  firstAmount: {
    label: 'Amount you want to buy (USD)',
    value: '',
  },
  from: {
    label: 'Payment',
    value: '',
    optionsKey: 'paymentMethods',
  },
  to: {
    label: 'E-currency',
    value: '',
    optionsKey: 'eCurrencies',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: '',
  },
  secondAmount: {
    label: 'You have to send (USD)',
    value: '',
  },
};

const sell = {
  firstAmount: {
    label: 'Amount you want to sell (USD)',
    value: '',
  },
  from: {
    label: 'E-currency',
    value: '',
    optionsKey: 'eCurrencies',
  },
  to: {
    label: 'Payment',
    value: '',
    optionsKey: 'paymentMethods',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: '',
  },
  secondAmount: {
    label: 'You will receive (USD)',
    value: '',
  },
};

const exchange = {
  firstAmount: {
    label: 'Amount you want to exchange (USD)',
    value: '',
  },
  from: {
    label: 'Exchange from',
    value: '',
    optionsKey: 'eCurrencies',
  },
  to: {
    label: 'Exchange to',
    value: '',
    optionsKey: 'eCurrencies',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: '',
  },
  secondAmount: {
    label: 'You will receive (USD)',
    value: '',
  },
};

class CurrencyCalculator extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      buy: cloneDeep(buy),
      sell: cloneDeep(sell), 
      exchange: cloneDeep(exchange),
      eCurrencies: [],
      paymentMethods: [],
      calculatorActiveTab: 'buy',
    }
  }

  componentDidMount() {
    this.setState({
      eCurrencies: this.props.eCurrencies.map((eCurrency) => ({
        value: eCurrency.title, label: eCurrency.title,
      })),
      paymentMethods: this.props.paymentMethods.map((paymentMethod) => ({
        value: paymentMethod.title, label: paymentMethod.title,
      })),
    });
  }

  setCalculatorActiveTab = (e) => {
    const calculatorActiveTab = e.currentTarget.getAttribute('data-tab');

    this.setState({
      buy: cloneDeep(buy),
      sell: cloneDeep(sell), 
      exchange: cloneDeep(exchange),
      calculatorActiveTab,
    });
  }

  currencyCalculator = (currentTab) => {
    if (currentTab.to.value && currentTab.from.value && (currentTab.firstAmount.value || currentTab.firstAmount.value === '0')) {
      this.props.currencyCalculator({
        to: currentTab.to.value,
        from: currentTab.from.value,
        type: this.state.calculatorActiveTab,
        firstAmount: currentTab.firstAmount.value,
      }).then((res) => {
        if (res.status === 200) {
          currentTab = {...this.state[this.state.calculatorActiveTab]};
  
          currentTab.secondAmount.value = res.data.secondAmount;
          currentTab.serviceCharges.value = res.data.serviceCharges;
  
          this.setState({
            [this.state.calculatorActiveTab]: currentTab,
          });
        }
      }).catch((err) => {
        throw new Error(err);
      });
    }
  }

  handleChange = (key, value) => {
    let currentTab = {...this.state[this.state.calculatorActiveTab]};
    currentTab[key].value = value;

    this.setState({
      [this.state.calculatorActiveTab]: currentTab,
    }, () => {
      if (key === 'to' || key === 'from') {
        this.currencyCalculator(currentTab);
      }
    });
  }

  verifyFirstAmountValue = (e) => {
    let currentTab = {...this.state[this.state.calculatorActiveTab]};

    if (isNaN(currentTab.firstAmount.value)) {
      currentTab.firstAmount.value = '0';
      this.setState({
        [this.state.calculatorActiveTab]: currentTab,
      }, () => {
        this.currencyCalculator(currentTab);
      });
    } else if (parseFloat(currentTab.firstAmount.value) < 0) {
      
      currentTab.firstAmount.value = currentTab.firstAmount.value * -1;
      this.setState({
        [this.state.calculatorActiveTab]: currentTab,
      }, () => {
        this.currencyCalculator(currentTab);
      });
    } else {
      this.currencyCalculator(currentTab);
    }
  }

  handleBtnClick = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push(`dashboard/${this.state.calculatorActiveTab}`);
    } else {
      this.props.saveIsLoginModalOpen(true);
    }
  }

  getBtnTxt = () => {
    if (this.state.calculatorActiveTab === 'buy') {
      return 'BUY / DEPOSIT';
    } else if (this.state.calculatorActiveTab === 'sell') {
      return 'SELL / WITHDRAWAL';
    }

    return this.state.calculatorActiveTab;
  }

  render() {
    const currentTab = this.state[this.state.calculatorActiveTab];

    return (
      <div className="currency-calculator-container df jc-fs ai-c">
        <div className="currency-calculator">
          <div className="tabs df jc-fs ai-c">
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'buy'})} data-tab="buy" onClick={this.setCalculatorActiveTab}><span>BUY / DEPOSIT</span></div>
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'sell'})} data-tab="sell" onClick={this.setCalculatorActiveTab}><span>SELL / WITHDRAWAL</span></div>
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'exchange'})} data-tab="exchange" onClick={this.setCalculatorActiveTab}><span>EXCHANGE</span></div>
          </div>
          <div className="tab-content">
            <div className="form-field amount-buy">
              <label className="label">{currentTab.firstAmount.label}:</label>
              <input
                type="text"
                value={currentTab.firstAmount.value}
                onBlur={this.verifyFirstAmountValue}
                onChange={(e) => this.handleChange('firstAmount', e.target.value)}
              />
            </div>

            <div className="form-field amount-to-from df jc-fs ai-c">
              <div className="left">
                <label className="label">{currentTab.from.label}:</label>
                <Select
                  isClearable
                  key={this.state.calculatorActiveTab}
                  isSearchable={false}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(opt) => this.handleChange('from', opt ? opt.value : '')}
                  options={this.state[currentTab.from.optionsKey].filter(option => (option.value !== this.state[this.state.calculatorActiveTab].to.value))}
                />
              </div>
              <div className="arrow-icon-container df jc-c ai-c">
                <i className="fa fa-long-arrow-alt-right arrow-icon" />
              </div>
              <div className="right">
                <label className="label">{currentTab.to.label}:</label>
                <Select
                  isClearable
                  key={this.state.calculatorActiveTab}
                  isSearchable={false}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(opt) => this.handleChange('to', opt ? opt.value : '')}
                  options={this.state[currentTab.to.optionsKey].filter(option => (option.value !== this.state[this.state.calculatorActiveTab].from.value))}
                />
              </div>
            </div>

            <div className="form-field service-charges">
              <label className="label">{currentTab.serviceCharges.label}:</label>
              <input type="text" value={currentTab.serviceCharges.value} />
            </div>

            <div className="form-field amount-to-send">
              <label className="label">{currentTab.secondAmount.label}:</label>
              <input type="text" value={currentTab.secondAmount.value} />
            </div>

            <div className="btn-container" onClick={this.handleBtnClick}>
              <button className="btn">{this.getBtnTxt()}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CurrencyCalculator);