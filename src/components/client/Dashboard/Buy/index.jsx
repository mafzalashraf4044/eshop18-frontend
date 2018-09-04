import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Select from 'react-select';

//  custom components
import PlaceOrder from '../../common/PlaceOrder';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class Buy extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-content-buy">
        <div className="heading df jc-fs ai-c">
          <i className="fa fa-credit-card icon" />
          <h2>Buy</h2>
        </div>

        {
          this.props.eCurrencies.length > 0 && this.props.paymentMethods.length > 0 &&
          <PlaceOrder
            orderType="buy"
            placeOrder={this.props.placeOrder}
            eCurrencies={this.props.eCurrencies}
            paymentMethods={this.props.paymentMethods}
            currencyCalculator={this.props.currencyCalculator}
          />
        }
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  eCurrencies: state.MainReducer.eCurrencies,
  paymentMethods: state.MainReducer.paymentMethods,
});

const mapDispatchToProps = (dispatch) => ({
  placeOrder: order => dispatch(actions.placeOrder(order)),
  currencyCalculator: params => dispatch(actions.currencyCalculator(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Buy);