import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Loader from 'react-loaders'
import { faPhoneSquare, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons'
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
  }

  getBlurstyle = () => {
    if (this.props.blurBackground || this.props.isLoading) {
      return { filter: 'blur(6px)', WebkitFilter: 'blur(6px)', MozFilter: 'blur(6px)', OFilter: 'blur(6px)', msFilter: 'blur(6px)' };
    }

    return {};
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
                <div className="currency-calculator"></div>
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