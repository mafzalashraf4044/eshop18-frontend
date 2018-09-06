import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  custom components
import PlaceOrder from '../../common/PlaceOrder';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class Exchange extends React.PureComponent {
  render() {
    return (
      <div className="dashboard-content-exchange">
        <div className="heading df jc-fs ai-c">
          <i className="fa fa-sync-alt icon" />
          <h2>Exchange</h2>
        </div>

        {
          this.props.eCurrencies.length > 0 && this.props.paymentMethods.length > 0 &&
          <PlaceOrder
            orderType="exchange"
            config={this.props.config}
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
  config: state.MainReducer.config,
  eCurrencies: state.MainReducer.eCurrencies,
  paymentMethods: state.MainReducer.paymentMethods,
});

const mapDispatchToProps = (dispatch) => ({
  placeOrder: order => dispatch(actions.placeOrder(order)),
  currencyCalculator: params => dispatch(actions.currencyCalculator(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Exchange);