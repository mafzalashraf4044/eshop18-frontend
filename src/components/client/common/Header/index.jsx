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
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({width: window.innerWidth});
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

  onLogoClick = () => {
    window.location = '/';
  }

  render() {
    return (
      <div className="header">
        {
          this.state.width > 991 &&
          <div className="df jc-c ai-c">eshop18 Ltd: The Authorized Wholesaler of E-Currency.</div>
        }
        <div className="navbar-md hidden-sm df jc-sb ai-c">
          <div className="logo-container df jc-c ai-c" onClick={this.onLogoClick}>
            <img src={require('../../../../assets/images/site-logo.png')} alt="site-logo"/>
          </div>
          <ul className="nav df jc-fe ai-c">
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/'})} to="/"><span>Home</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/buy'})} to="/buy"><span>Buy / Deposit</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/sell'})} to="/sell"><span>Sell / Withdrawal</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/exchange'})} to="/exchange"><span>Exhange</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/rules'})} to="/rules"><span>Rules</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c">
              <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname === '/faq'})} to="/faq"><span>FAQ</span></Link>
            </li>
            {
              this.props.isLoggedIn &&
              <li className="nav-item df jc-c ai-c">
                <Link className={classNames("df jc-c ai-c", {active: this.props.location.pathname.indexOf('dashboard') !== -1})} to="/dashboard"><span>Dashboard</span></Link>
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
                <div className="email-us df fd-c jc-fs ai-c">
                  <div className="heading-container df jc-fs ai-c">
                    <i className="fa fa-envelope email-icon" />
                    <p className="heading-txt">Email us</p>
                  </div>
                  <div className="body">
                    <p className="main-txt">admin@eshop18.com</p>
                    <p className="main-txt">eshop18@gmail.com (Google talk)</p>
                    <p className="main-txt">ebuy.exchange (Skype)</p>
                    <p className="main-txt">eshop18@hotmail.com</p>
                    <p className="main-txt">eshop18@yahoo.com</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className="navbar-xs hidden-md">
          <div className="toggle-nav df jc-sb ai-c">
            <div className="logo-container df jc-c ai-c">
              <img src={require('../../../../assets/images/site-logo.png')} alt="site-logo"/>
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
              <Link to="/buy"><span>Buy / Deposit</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/sell"><span>Sell / Withdrawal</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/exchange"><span>Exhange</span></Link>
            </li>
            <li className="nav-item df jc-c ai-c" onClick={() => {this.toggleMenuOpen(); window.scrollTo(0,0)}}>
              <Link to="/rules"><span>Rules</span></Link>
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