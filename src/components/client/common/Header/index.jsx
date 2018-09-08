import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { Link } from "react-router-dom";

//  styles
import './styles.scss';

import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class Header extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }

  toggleLoginModal = () => {
    const isLoginModalOpen = !this.props.isLoginModalOpen;
    this.props.saveIsBlur(isLoginModalOpen);
    this.props.saveIsLoginModalOpen(isLoginModalOpen);
  }

  toggleRegisterModal = () => {
    const isRegisterModalOpen = !this.props.isRegisterModalOpen;
    this.props.saveIsBlur(isRegisterModalOpen);
    this.props.saveIsRegisterModalOpen(isRegisterModalOpen);
  }

  toggleMenuOpen = (e) => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  }

  render() {
    return (
      <div className="header">
        <div className="df jc-c ai-c">EbuyExchange Ltd: The Authorized Wholesaler of E-Currency.</div>
        <div className="navbar-md hidden-sm df jc-sb ai-c">
          <div className="logo-container df jc-c ai-c">
            <h1 className="logo">eBUYexchange</h1>
          </div>
          <ul className="nav df jc-fe ai-c">
            <li className="nav-item df jc-c ai-c">
              <Link className="df jc-c ai-c" to="/"><span>Home</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className="df jc-c ai-c" to="/buy"><span>Buy / Deposit</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className="df jc-c ai-c" to="/sell"><span>Sell / Withdrawal</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className="df jc-c ai-c" to="/exchange"><span>Exhange</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className="df jc-c ai-c" to="/faq"><span>FAQ</span></Link>
            </li>
            {
              this.props.isLoggedIn &&
              <li className="nav-item df jc-c ai-c">
                <Link className="df jc-c ai-c" to="/dashboard"><span>Dashboard</span></Link>
              </li>
            }

            {
              !this.props.isLoggedIn &&
              <li className="nav-item df jc-c ai-c" onClick={this.toggleRegisterModal}>
                <a className="df jc-c ai-c" to="/dashboard"><span>Register</span></a>
              </li>
            }

            {
              !this.props.isLoggedIn ?
              <li className="nav-item df jc-c ai-c" onClick={this.toggleLoginModal}>
                <a className="df jc-c ai-c" to="/dashboard"><span>Login</span></a>
              </li> :
              <li className="nav-item df jc-c ai-c" onClick={this.props.logout}>
                <a className="df jc-c ai-c" to="/dashboard"><span>Logout</span></a>
              </li>
            }
            <li className="nav-item contact-us df jc-c ai-c">
              <a href="#" className="df jc-c ai-c"><i className="fa fa-phone-square contact-icon" /></a>
              <div className="contact-details">
                <div className="call-us df fd-c jc-fs ai-c">
                  <div className="heading-container df jc-fs ai-c">
                    <i className="fa fa-phone-volume call-icon" />
                    <p className="heading-txt">Call us</p>
                  </div>
                  <div className="body">
                    <p className="main-txt">Have a question? Call us at 877-414-6359</p>
                    <p className="sub-txt">Lines are open 8am-8pm Monday to Friday, and 9am-5pm Saturday (EST).</p>
                  </div>
                </div>
                <div className="email-us df fd-c jc-fs ai-c">
                  <div className="heading-container df jc-fs ai-c">
                    <i className="fa fa-envelope email-icon" />
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

        <div className="navbar-xs hidden-md">
          <div className="toggle-nav df jc-sb ai-c">
            <div className="logo-container df jc-c ai-c">
              <h1 className="logo">eBUYexchange</h1>
            </div>
            <div className={classNames('menu-icon', {'menu-open': this.state.isMenuOpen})} onClick={this.toggleMenuOpen}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ul className={classNames('nav df fd-c jc-fe ai-c', {'menu-open': this.state.isMenuOpen})}>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/"><span>Home</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/buy"><span>Buy</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/sell"><span>Sell</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/exchange"><span>Exhange</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/faq"><span>FAQ</span></Link>
            </li>
            {
              this.props.isLoggedIn &&
              <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
                <Link to="/dashboard"><span>Dashboard</span></Link>
              </li>
            }

            {
              !this.props.isLoggedIn &&
              <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0); this.toggleRegisterModal();}}>
                <a><span>Register</span></a>
              </li>
            }

            {
              !this.props.isLoggedIn ?
              <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0); this.toggleLoginModal();}}>
                <a><span>Login</span></a>
              </li> :
              <li className="nav-item df jc-c ai-c" onClick={this.props.logout}>
                <a><span>Logout</span></a>
              </li>
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isBlur: state.MainReducer.isBlur,
  isLoggedIn: state.MainReducer.isLoggedIn,
  isLoginModalOpen: state.MainReducer.isLoginModalOpen,
  isRegisterModalOpen: state.MainReducer.isRegisterModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  saveIsBlur: isBlur => dispatch(actions.saveIsBlur(isBlur)),
  saveIsLoginModalOpen: isLoginModalOpen => dispatch(actions.saveIsLoginModalOpen(isLoginModalOpen)),
  saveIsRegisterModalOpen: isRegisterModalOpen => dispatch(actions.saveIsRegisterModalOpen(isRegisterModalOpen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);