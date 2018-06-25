import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Loader from 'react-loaders';
import { Table } from 'react-bootstrap';
import { faPhoneSquare, faPhoneVolume, faEnvelope, faLongArrowAltRight, faEquals, faCreditCard, faMoneyBillAlt, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//  custom components

//  redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/EditorActionCreators';

//  styles
import './index.scss';
import 'loaders.css/src/animations/ball-grid-pulse.scss';

class Home extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      calculatorActiveTab: 'buy',
    }
  }

  getBlurstyle = () => {
    if (this.props.blurBackground || this.props.isLoading) {
      return { filter: 'blur(6px)', WebkitFilter: 'blur(6px)', MozFilter: 'blur(6px)', OFilter: 'blur(6px)', msFilter: 'blur(6px)' };
    }

    return {};
  }

  setCalculatorActiveTab = (e) => {
    const calculatorActiveTab = e.currentTarget.getAttribute('data-tab');

    this.setState({
      calculatorActiveTab,
    });
  }

  render() {
    return (
      <div className="ebuyexhange">
        <div className="header">
            <div className="navbar-sm df jc-sb ai-c">
              <div className="logo-container df jc-c ai-c">
                <h1 className="logo">eBUYexchange</h1>
              </div>

              <ul className="nav df jc-fe ai-c">
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Home</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Buy</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Sell</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Exchange</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Fees</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>FAQ</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>News</span></a>
                </li>
                <li className="nav-item df jc-c ai-c">
                  <a href="#"><span>Feedback</span></a>
                </li>
                <li className="nav-item contact-us df jc-c ai-c">
                  <a href="#"><FontAwesomeIcon icon={faPhoneSquare} className="contact-icon" /></a>
                  <div className="contact-details">
                    <div className="call-us df fd-c jc-fs ai-c">
                      <div className="heading-container df jc-fs ai-c">
                        <FontAwesomeIcon icon={faPhoneVolume} className="call-icon" />
                        <p className="heading-txt">Call us</p>
                      </div>
                      <div className="body">
                        <p className="main-txt">Have a question? Call us at 877-414-6359</p>
                        <p className="sub-txt">Lines are open 8am-8pm Monday to Friday, and 9am-5pm Saturday (EST).</p>
                      </div>
                    </div>
                    <div className="email-us df fd-c jc-fs ai-c">
                      <div className="heading-container df jc-fs ai-c">
                        <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                        <p className="heading-txt">Email us</p>
                      </div>
                      <div className="body">
                        <p className="main-txt">mail@ebuyexhange.com</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
        </div>
        <div className="body">
          <div className="banner-wrapper">
            <div className="banner df jc-fs ai-c">
              <div className="site-intro-container df jc-c ai-c">
                <div className="site-intro">
                  <h1 className="title">eBUYexhange – THE E-CURRENCY EXCHANGE EXPERTS</h1>
                  <p className="txt">We provide best rates, buy, sell and exchange E-currency with trust</p>
                </div>
              </div>
              <div className="currency-calculator-container df jc-fs ai-c">
                <div className="currency-calculator">
                  <div className="tabs df jc-fs ai-c">
                    <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'buy'})} data-tab="buy" onClick={this.setCalculatorActiveTab}><span>BUY</span></div>
                    <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'sell'})} data-tab="sell" onClick={this.setCalculatorActiveTab}><span>SELL</span></div>
                    <div className={classNames('tab df jc-c ai-c', {selected: this.state.calculatorActiveTab === 'exchange'})} data-tab="exchange" onClick={this.setCalculatorActiveTab}><span>EXCHANGE</span></div>
                  </div>
                  <div className="tab-content">
                    {
                      this.state.calculatorActiveTab === 'buy' &&
                      <div className="buy">
                        <div className="form-field amount-buy">
                          <label className="label">Amount you want to buy (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-to-from df jc-fs ai-c">
                          <div className="left">
                            <label className="label">E-currency:</label>
                            <input type="text" />
                          </div>
                          <div className="arrow-icon-container df jc-c ai-c">
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="arrow-icon" />
                          </div>
                          <div className="right">
                            <label className="label">Payment:</label>
                            <input type="text" />
                          </div>
                        </div>

                        <div className="form-field service-charges">
                          <label className="label">Service Charges:</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-to-send">
                          <label className="label">You have to send (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="btn-container">
                          <button className="btn">BUY</button>
                        </div>
                      </div>
                    }

                    {
                      this.state.calculatorActiveTab === 'sell' &&
                      <div className="sell">
                        <div className="form-field amount-sell">
                          <label className="label">Amount you want to sell (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-to-from df jc-fs ai-c">
                          <div className="left">
                            <label className="label">E-currency:</label>
                            <input type="text" />
                          </div>
                          <div className="arrow-icon-container df jc-c ai-c">
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="arrow-icon" />
                          </div>
                          <div className="right">
                            <label className="label">Payment:</label>
                            <input type="text" />
                          </div>
                        </div>

                        <div className="form-field service-charges">
                          <label className="label">Service Charges:</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-receive">
                          <label className="label">You will receive (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="btn-container">
                          <button className="btn">SELL</button>
                        </div>
                      </div>
                    }

                    {
                      this.state.calculatorActiveTab === 'exchange' &&
                      <div className="exchange">
                        <div className="form-field amount-sell">
                          <label className="label">Amount you want to exchange (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-to-from df jc-fs ai-c">
                          <div className="left">
                            <label className="label">Exchange from:</label>
                            <input type="text" />
                          </div>
                          <div className="arrow-icon-container df jc-c ai-c">
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="arrow-icon" />
                          </div>
                          <div className="right">
                            <label className="label">Exchange to:</label>
                            <input type="text" />
                          </div>
                        </div>

                        <div className="form-field service-charges">
                          <label className="label">Service Charges:</label>
                          <input type="text" />
                        </div>

                        <div className="form-field amount-receive">
                          <label className="label">You will receive (USD):</label>
                          <input type="text" />
                        </div>

                        <div className="btn-container">
                          <button className="btn">EXCHNAGE</button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-us-container df jc-fs ai-fs">
            <div className="currency-info">
              <table className="table table-striped table-bordered table-condensed table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>We Accept</th>
                    <th>Reserves</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Perfect Money</td>
                    <td>21495.63 USD</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>ADVcash</td>
                    <td>5017.04 USD</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>WebMoney</td>
                    <td>3156.35 USD</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Ripple</td>
                    <td>30718.54 USD</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Bitcoin</td>
                    <td>34713.83 USD</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>c-Gold</td>
                    <td>54647.42 USD</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>Epay</td>
                    <td>34120.87 USD</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>Tether USDT</td>
                    <td>35378.22 USD</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>Litecoin</td>
                    <td>33417.44 USD</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Ethereum</td>
                    <td>25120.47 USD</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="about-us">
              <h2>About Us</h2>
              <p>Our exchanger ebuyexchange.com is one of biggest and well known companies in this market, we are certified exchanger of most major electronic currencies. We were regularly awarded in various polls, made by different online magazines about finances, Our team counts tens of qualified workers from different countries, among those are certified accountants, lawyers, former bank employees, specialists in security and other spheres, related to finances. We have partnership with variety financial structures and serious law companies, our branches and representatives are located all around the world, so we are performing your orders in shortest terms at any time of day or night. We will be glad to provide you almost any legal financial service possible. Our staff is speaking many languages, and we will surely find common language with any customer!We are the Official & Authorize Exchanger /Merchant of C-Gold.com , EgoPay.com , PerfectMoney.com</p>
            </div>
          </div>

          <div className="our-services">
            <div className="our-services-txt">
              <h2>OUR SERVICES</h2>
              <p>Here you can buy, sell and exchange E-currency. Our site provides fast and secure exchanges with the lowest fees. Please Signup or Login to use our services</p>
            </div>
            <div className="services df jc-sb ai-c">
              <div className="service buy">
                <div className="service-icon-container df jc-c ai-c">
                  <FontAwesomeIcon icon={faCreditCard} className="service-icon" />
                </div>
                <div className="service-description">
                  <h2>BUY</h2>
                  <p>You can buy from a variety of E-currencies, by paying us amount in USD using the selected transfer option</p>
                </div>
              </div>
              <div className="service sell">
                <div className="service-icon-container df jc-c ai-c">
                  <FontAwesomeIcon icon={faMoneyBillAlt} className="service-icon" />
                </div>
                <div className="service-description">
                  <h2>SELL</h2>
                  <p>You can sell out your E-currency to us, you will get the amount in USD using the selected transfer option</p>
                </div>
              </div>
            
              <div className="service exchange">
                <div className="service-icon-container df jc-c ai-c">
                  <FontAwesomeIcon icon={faSyncAlt} className="service-icon" />
                </div>
                <div className="service-description">
                  <h2>EXCHANGE</h2>
                  <p>You can exchange E-currency, you will pay the amount in selected E-currency, and will receive equavalent amount of exchanged E-currency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.EditorReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);