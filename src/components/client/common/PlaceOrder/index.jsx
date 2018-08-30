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

class PlaceOrder extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      buy: _.cloneDeep(buy),
      sell: _.cloneDeep(sell), 
      exchange: _.cloneDeep(exchange),
      eCurrencies: [],
      paymentMethods: [],
      isOrderPlaced: false,
    };
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

  handleChange = (key, value) => {
    let currentTab = {...this.state[this.props.orderType]};
    currentTab[key].value = value;

    this.setState({
      [this.props.orderType]: currentTab,
    }, () => {

      if (currentTab.to.value && currentTab.from.value && currentTab.firstAmount.value > 0) {
        this.props.currencyCalculator({
          to: currentTab.to.value,
          from: currentTab.from.value,
          type: this.props.orderType,
          firstAmount: currentTab.firstAmount.value,
        }).then((res) => {
          if (res.status === 200) {
            currentTab = {...this.state[this.props.orderType]};

            currentTab.secondAmount.value = res.data.secondAmount;
            currentTab.serviceCharges.value = res.data.serviceCharges;

            this.setState({
              [this.props.orderType]: currentTab,
            });
          }
        }).catch((err) => {
          throw new Error(err);
        });
      }
    });
  }

  placeOrder = () => {
    let currentTab = {...this.state[this.props.orderType]};
    
    this.props.placeOrder({
      to: currentTab.to.value,
      from: currentTab.from.value,
      type: this.props.orderType,
      firstAmount: currentTab.firstAmount.value,
    }).then((res) => {
      if (res.status === 200) {
        this.setState({
          isOrderPlaced: true,
        });
      }
    }).catch((err) => {
      throw new Error(err);
    });

  }

  render() {
    const currentTab = this.state[this.props.orderType];

    if (!this.state.isOrderPlaced) {
      return (
        <div className="form">
          <div className="form-field amount-buy">
            <label className="label">{currentTab.firstAmount.label}:</label>
            <input type="number" value={currentTab.firstAmount.value} onChange={(e) => this.handleChange('firstAmount', e.target.value)} />
          </div>
  
          <div className="form-field amount-to-from df jc-fs ai-c">
            <div className="left">
              <label className="label">{currentTab.from.label}:</label>
              <Select
                options={this.state[currentTab.from.optionsKey]}
                key={this.props.orderType}
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
                key={this.props.orderType}
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
  
          <div className="btn-container" onClick={this.placeOrder}>
            <button className="btn">{this.props.orderType}</button>
          </div>
        </div>
      );
    }

    return (
      <div className="order-placed">
        <p>Your order has been placed successfully, kindly check your email for further details.</p>
      </div>
    );

  }
}

export default withRouter(PlaceOrder);