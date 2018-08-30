import React from 'react';

//  third party libraries
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Select from 'react-select';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

//  styles
import './styles.scss';

const buy = {
  firstAmount: {
    label: 'Amount you want to buy (USD)',
    value: 0,
  },
  from: {
    label: 'Payment',
    value: 0,
    optionsKey: 'paymentMethods',
  },
  to: {
    label: 'E-currency',
    value: 0,
    optionsKey: 'eCurrencies',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: 0,
  },
  secondAmount: {
    label: 'You have to send (USD)',
    value: 0,
  },
};

const sell = {
  firstAmount: {
    label: 'Amount you want to sell (USD)',
    value: 0,
  },
  from: {
    label: 'E-currency',
    value: 0,
    optionsKey: 'eCurrencies',
  },
  to: {
    label: 'Payment',
    value: 0,
    optionsKey: 'paymentMethods',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: 0,
  },
  secondAmount: {
    label: 'You will receive (USD)',
    value: 0,
  },
};

const exchange = {
  firstAmount: {
    label: 'Amount you want to exchange (USD)',
    value: 0,
  },
  from: {
    label: 'Exchange from',
    value: 0,
    optionsKey: 'eCurrencies',
  },
  to: {
    label: 'Exchange to',
    value: 0,
    optionsKey: 'eCurrencies',
  },
  serviceCharges: {
    label: 'Service Charges',
    value: 0,
  },
  secondAmount: {
    label: 'You will receive (USD)',
    value: 0,
  },
};

class CurrencyCalculator extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      buy: _.cloneDeep(buy),
      sell: _.cloneDeep(sell), 
      exchange: _.cloneDeep(exchange),
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
      buy: _.cloneDeep(buy),
      sell: _.cloneDeep(sell), 
      exchange: _.cloneDeep(exchange),
      calculatorActiveTab,
    });
  }

  handleChange = (key, value) => {
    let currentTab = {...this.state[this.state.calculatorActiveTab]};
    currentTab[key].value = value;

    this.setState({
      [this.state.calculatorActiveTab]: currentTab,
    }, () => {

      if (currentTab.to.value && currentTab.from.value && currentTab.firstAmount.value > 0) {
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
    });
  }

  handleBtnClick = () => {
    if (this.props.isLoggedIn) {
      this.props.history.push(`dashboard/${this.state.calculatorActiveTab}`);
    } else {
      this.props.saveIsLoginModalOpen(true);
    }
  }

  render() {
    const currentTab = this.state[this.state.calculatorActiveTab];

    return (
      <div className="currency-calculator-container df jc-fs ai-c">
        <div className="currency-calculator">
          <div className="tabs df jc-fs ai-c">
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'buy'})} data-tab="buy" onClick={this.setCalculatorActiveTab}><span>BUY</span></div>
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'sell'})} data-tab="sell" onClick={this.setCalculatorActiveTab}><span>SELL</span></div>
            <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'exchange'})} data-tab="exchange" onClick={this.setCalculatorActiveTab}><span>EXCHANGE</span></div>
          </div>
          <div className="tab-content">
            <div className="form-field amount-buy">
              <label className="label">{currentTab.firstAmount.label}:</label>
              <input type="number" value={currentTab.firstAmount.value} onChange={(e) => this.handleChange('firstAmount', e.target.value)} />
            </div>

            <div className="form-field amount-to-from df jc-fs ai-c">
              <div className="left">
                <label className="label">{currentTab.from.label}:</label>
                <Select
                  options={this.state[currentTab.from.optionsKey]}
                  key={this.state.calculatorActiveTab}
                  isSearchable={false}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(opt) => this.handleChange('from', opt.value)}
                />
              </div>
              <div className="arrow-icon-container df jc-c ai-c">
                <FontAwesomeIcon icon={faLongArrowAltRight} className="arrow-icon" />
              </div>
              <div className="right">
                <label className="label">{currentTab.to.label}:</label>
                <Select
                  options={this.state[currentTab.to.optionsKey]}
                  key={this.state.calculatorActiveTab}
                  isSearchable={false}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(opt) => this.handleChange('to', opt.value)}
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
              <button className="btn">{this.state.calculatorActiveTab}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CurrencyCalculator);