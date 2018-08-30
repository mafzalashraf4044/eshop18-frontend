import React from 'react';

//  third party libraries
import _ from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faCreditCard, faMoneyBillAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class OrdersHistory extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.props.getUserOrders().then((res) => {
      if (res.status === 200) {
        this.setState({
          orders: res.data.orders,
        });
      }
    }).catch((err) => {
      throw new Error(err);
    });
  }

  render() {
    const buyOrders = _.compact(this.state.orders.map(order => (order.type === 'buy' ? order : null)));
    const sellOrders = _.compact(this.state.orders.map(order => (order.type === 'sell' ? order : null)));
    const exchangeOrders = _.compact(this.state.orders.map(order => (order.type === 'exchange' ? order : null)));

    return (
      <div className="dashboard-content-orders-history">
        <div className="buy-stats">
          <div className="heading df jc-fs ai-c">
            <FontAwesomeIcon icon={faCreditCard} className="icon" />
            <h2>Buy Orders Statistics</h2>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sent From</th>
                  <th>Amount Send</th>
                  <th>Recive In</th>
                  <th>Amount Recieve</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  buyOrders.map((order, index) => (
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.sentFrom}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn}</td>
                      <td>${order.amountReceived}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                }

                {
                  buyOrders.length === 0 &&
                  <tr>
                    <td colSpan={6}>Nothing to display.</td>
                  </tr>
                }

              </tbody>
            </table>
          </div>
        </div>

        <div className="sell-stats">
          <div className="heading df jc-fs ai-c">
            <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
            <h2>Sell Orders Statistics</h2>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sent From</th>
                  <th>Amount Send</th>
                  <th>Recive In</th>
                  <th>Amount Recieve</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  sellOrders.map((order, index) => (
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.sentFrom}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn}</td>
                      <td>${order.amountReceived}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                }

                {
                  sellOrders.length === 0 &&
                  <tr>
                    <td colSpan={6}>Nothing to display.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="exchange-stats">
          <div className="heading df jc-fs ai-c">
            <FontAwesomeIcon icon={faSyncAlt} className="icon" />
            <h2>Exchange Orders Statistics</h2>
          </div>
          
          <div className="table-responsive">
            <table className="table table-bordered table-hover table-condensed">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sent From</th>
                  <th>Amount Send</th>
                  <th>Recive In</th>
                  <th>Amount Recieve</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  exchangeOrders.map((order, index) => (
                    <tr>
                      <td>{order.id}</td>
                      <td>{order.sentFrom}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn}</td>
                      <td>${order.amountReceived}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                }

                {
                  exchangeOrders.length === 0 &&
                  <tr>
                    <td colSpan={6}>Nothing to display.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getUserOrders: () => dispatch(actions.getUserOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistory);