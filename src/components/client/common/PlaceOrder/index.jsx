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

class PlaceOrder extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      buy: cloneDeep(buy),
      sell: cloneDeep(sell), 
      exchange: cloneDeep(exchange),
      eCurrencies: [],
      paymentMethods: [],
      isOrderPlaced: false,
      responseMsg: {type: '', text: ''},
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

  currencyCalculator = (currentTab) => {
    if (currentTab.to.value && currentTab.from.value && (currentTab.firstAmount.value || currentTab.firstAmount.value === '0')) {
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
  }

  handleChange = (key, value) => {
    let currentTab = {...this.state[this.props.orderType]};
    currentTab[key].value = value;

    this.setState({
      [this.props.orderType]: currentTab,
    }, () => {
      if (key === 'to' || key === 'from') {
        this.currencyCalculator(currentTab);
      }
    });
  }

  verifyFirstAmountValue = (e) => {
    let currentTab = {...this.state[this.props.orderType]};

    if (isNaN(currentTab.firstAmount.value)) {
      currentTab.firstAmount.value = '0';
      this.setState({
        [this.props.orderType]: currentTab,
      }, () => {
        this.currencyCalculator(currentTab);
      });
    } else if (parseFloat(currentTab.firstAmount.value) < 0) {
      currentTab.firstAmount.value = currentTab.firstAmount.value * -1;
      this.setState({
        [this.props.orderType]: currentTab,
      }, () => {
        this.currencyCalculator(currentTab);
      });
    } else {
      this.currencyCalculator(currentTab);
    }
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
      this.setState({
        responseMsg: {
          type: 'err',
          text: err.response.data.details || err.response.data.raw,
        } 
      });

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
            <input type="text" value={currentTab.firstAmount.value} onBlur={this.verifyFirstAmountValue} onChange={(e) => this.handleChange('firstAmount', e.target.value)} />
          </div>
  
          <div className="form-field amount-to-from df jc-fs ai-c">
            <div className="left">
              <label className="label">{currentTab.from.label}:</label>
              <Select
                isClearable
                key={this.props.orderType}
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                onChange={(opt) => this.handleChange('from', opt ? opt.value : '')}
                options={this.state[currentTab.from.optionsKey].filter(option => (option.value !== this.state[this.props.orderType].to.value))}
              />
            </div>
            <div className="arrow-icon-container df jc-c ai-c">
              <i className="fa fa-long-arrow-alt-right arrow-icon" />
            </div>
            <div className="right">
              <label className="label">{currentTab.to.label}:</label>
              <Select
                isClearable
                key={this.props.orderType}
                isSearchable={false}
                className="react-select"
                classNamePrefix="react-select"
                onChange={(opt) => this.handleChange('to', opt ? opt.value : '')}
                options={this.state[currentTab.to.optionsKey].filter(option => (option.value !== this.state[this.props.orderType].from.value))}
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
  
          {
            this.state.responseMsg.text &&
            <div className={classNames({'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>{this.state.responseMsg.text}</div>
          }

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