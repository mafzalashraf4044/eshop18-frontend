import React from 'react';

//  third party libraries
import compact from 'lodash/compact';
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
    const buyOrders = compact(this.state.orders.map(order => (order.type === 'buy' ? order : null)));
    const sellOrders = compact(this.state.orders.map(order => (order.type === 'sell' ? order : null)));
    const exchangeOrders = compact(this.state.orders.map(order => (order.type === 'exchange' ? order : null)));

    return (
      <div className="dashboard-content-orders-history">
        <div className="buy-stats">
          <div className="heading df jc-fs ai-c">
            <i className="fa fa-credit-card icon" />
            <h2>Buy / Deposit Orders</h2>
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
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.sentFrom.title}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn.title}</td>
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
            <i className="fa fa-money-bill-alt icon" />
            <h2>Sell / Withdrawal Orders</h2>
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
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.sentFrom.title}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn.title}</td>
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
            <i className="fa fa-sync-alt icon" />
            <h2>Exchange Orders</h2>
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
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.sentFrom.title}</td>
                      <td>${order.amountSent}</td>
                      <td>{order.receivedIn.title}</td>
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