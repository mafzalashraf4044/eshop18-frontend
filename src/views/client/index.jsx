import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Slider from "react-slick";
import Loader from 'react-loaders';
import { Link } from "react-router-dom";
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

//  custom components
import LoginModal from 'components/client/common/LoginModal';
import RegisterModal from 'components/client/common/RegisterModal';
import ForgotPwdModal from 'components/client/common/ForgotPwdModal';
import ResetPwdModal from 'components/client/common/ResetPwdModal';

import Home from 'components/client/Home';
import Buy from 'components/client/Buy';
import Sell from 'components/client/Sell';
import Exchange from 'components/client/Exchange';
import Rules from 'components/client/Rules';
import FAQ from 'components/client/FAQ';
import Dashboard from 'components/client/Dashboard';
import Header from 'components/client/common/Header';
import Footer from 'components/client/common/Footer';
import Reviews from 'components/client/common/Reviews';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/MainActionCreators';

//  styles
import './styles.scss';
import 'loaders.css/src/animations/ball-grid-pulse.scss';

const AuthProtectedRoute = ({ isAllowed, ...props }) => isAllowed ? <Route {...props} /> : <Redirect to="/" />;

class Client extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      siteLoader: true,
      verifyEmailResponse: {type: '', text: ''},
      isLoggedInChecked: localStorage.getItem("token") === null,
    }
  }

  handleWindowLoaded = () => {
    this.setState({
      siteLoader: false,
    }, () => {
      const userId = this.getParameterByName('id', window.location.href);
      const forgotPwdHash = this.getParameterByName('forgotPwdHash', window.location.href);
      const emailVerifyHash = this.getParameterByName('emailVerifyHash', window.location.href);
  
      if (userId && forgotPwdHash) {
        this.props.saveIsBlur(true);
        this.props.saveIsResetPwdModalOpen(true);
      }
  
      if (userId && emailVerifyHash) {
        this.props.verifyEmail(userId, emailVerifyHash).then((res) => {
          if (res.status === 200) {
            this.setState({
              verifyEmailResponse: {
                type: 'success',
                text: res.data.details,
              }
            }, () => {
              this.props.saveIsLoginModalOpen(true);
              window.history.replaceState(null, null, window.location.pathname);
  
              setTimeout(() => {
                this.setState({verifyEmailResponse: {type: '', text: ''}});
              }, 5000);
            });
          }
        }).catch((err) => {
          this.setState({
            verifyEmailResponse: {
              type: 'err',
              text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.',
            },
          }, () => {
            this.props.saveIsLoginModalOpen(true);
            window.history.replaceState(null, null, window.location.pathname);
            
            setTimeout(() => {
              this.setState({verifyEmailResponse: {type: '', text: ''}});
            }, 5000);
          });
  
          throw new Error(err);
        });
      }
    });
  }

  componentWillMount() {
    window.addEventListener('load', this.handleWindowLoaded);

    this.props.checkIsLoggedIn().then((res) => {
      if (res.status === 200) {
        this.props.saveIsLoggedIn(true);
        this.props.saveUser(res.data.user);
        this.setState({
          isLoggedInChecked: true,
        });
      }
    }).catch((err) => {
      if (err.response.status === 403) {
        this.props.saveIsLoggedIn(false);
        this.props.saveUser(null);
        this.setState({
          isLoggedInChecked: true,
        });
      }

      throw new Error(err);
    });

    this.props.getECurrencies().then((res) => {
      if (res.status === 200) {
        this.props.saveECurrencies(res.data.eCurrencies);
      }
    }).catch((err) => {
      throw new Error(err);
    });

    this.props.getPaymentMethods().then((res) => {
      if (res.status === 200) {
        this.props.savePaymentMethods(res.data.paymentMethods);
      }
    }).catch((err) => {
      throw new Error(err);
    });

    this.props.getNews().then((res) => {
      if (res.status === 200) {
        this.props.saveNews(res.data.news);
      }
    }).catch((err) => {
      throw new Error(err);
    });

    this.props.getReviews().then((res) => {
      if (res.status === 200) {
        this.props.saveReviews(res.data.reviews);
      }
    }).catch((err) => {
      throw new Error(err);
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location !== newProps.location) {
      window.scrollTo(0, 0);
    }
  }

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  toggleModal = () => {
    this.props.saveIsBlur(false);

    if (this.props.isLoginModalOpen) {
      this.props.saveIsLoginModalOpen(false);
      this.setState({verifyEmailResponse: {type: '', text: ''}});
    } else if (this.props.isForgotPwdModalOpen) {
      this.props.saveIsForgotPwdModalOpen(false);
    } else if (this.props.isResetPwdModalOpen) {
      this.props.saveIsResetPwdModalOpen(false);
    } else {
      this.props.saveIsRegisterModalOpen(false);
    }
  }

  handleForgotPwdClick = () => {
    this.toggleModal();
    this.props.saveIsBlur(true);
    this.props.saveIsForgotPwdModalOpen(true);
  }

  logout = () => {
    this.props.saveIsLoading(true);
    this.props.logout().then((res) => {
      if (res.status === 200) {
        this.props.history.push('/');
        this.props.saveIsLoggedIn(false);
        localStorage.removeItem("token");
        this.props.saveUser(null);
      }
      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);   
      throw new Error(err);
    });
  }

  render() {
    if (this.state.isLoggedInChecked) {
      return (
        <div className="client">
          {
            this.props.location.pathname === '/' && !this.state.siteLoader &&
            <div className="icon-bar">
              <a href="skype:ebuy.exchange?chat" className="skype"><i className="fab fa-skype"></i></a>
              <a href="mailto:ebuyexchange@gmail.com" className="google"><i className="fab fa-google"></i></a> 
              <a href="mailto:ebuyexchange@yahoo.com" className="yahoo"><i className="fab fa-yahoo"></i></a> 
            </div>
          }

          {
            this.state.siteLoader &&
            <div className="site-loader-container df jc-c ai-c">
              <img src={require('../../assets/images/site-logo.png')} alt="site-logo"/>
            </div>
          }

          {
            this.props.isLoading &&
            <div className="main-loader-container df jc-c ai-c">
              <Loader type="ball-grid-pulse" active={this.props.isLoading} color="#0f8ce0" />
            </div>
          }
          <div className={classNames('blur-container', {'blur-active': this.props.isBlur || this.props.isLoading}, {'site-loader-blur-active': this.state.siteLoader})}>
            <Header logout={this.logout} location={this.props.location} />
            <div className="body">
              {
                this.props.location.pathname !== '/' &&
                <div className="breadcrumb-container">
                  <ul className="breadcrumb df jc-fs ai-c">
                    <li>
                      <Link to="/"><i className="fa fa-home home-icon" /></Link>
                    </li>
                    <li>&nbsp;&nbsp;/&nbsp;&nbsp; {this.props.location.pathname.slice(1).replace('/', '  /  ').replace('-', ' ')}</li>
                  </ul>
                </div>
              }
  
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/buy" component={Buy} />
                <Route exact path="/sell" component={Sell} />
                <Route exact path="/exchange" component={Exchange} />
                <Route exact path="/rules" component={Rules} />
                <Route exact path="/faq" component={FAQ} />
                <AuthProtectedRoute isAllowed={this.props.isLoggedIn} path='/dashboard' component={Dashboard} />
                <Redirect to='/' />
              </Switch>
  
              {
                this.props.reviews.length > 0 &&
                <Reviews reviews={this.props.reviews} />
              }
            </div>
            <Footer />
          </div>
  
          {
            this.props.isLoginModalOpen &&
            <LoginModal
              login={this.props.login}
              history={this.props.history}
              saveUser={this.props.saveUser}
              toggleModal={this.toggleModal}
              saveIsLoading={this.props.saveIsLoading}
              saveIsLoggedIn={this.props.saveIsLoggedIn}
              handleForgotPwdClick={this.handleForgotPwdClick}
              verifyEmailResponse={this.state.verifyEmailResponse}
            />
          }
  
          {
            this.props.isForgotPwdModalOpen &&
            <ForgotPwdModal
              forgotPwd={this.props.forgotPwd}
              toggleModal={this.toggleModal}
              saveIsLoading={this.props.saveIsLoading}
            />
          }

          {
            this.props.isResetPwdModalOpen &&
            <ResetPwdModal
              resetPwd={this.props.resetPwd}
              toggleModal={this.toggleModal}
              saveIsLoading={this.props.saveIsLoading}
            />
          }

  
          {
            this.props.isRegisterModalOpen &&
            <RegisterModal toggleModal={this.toggleModal} register={this.props.register} saveIsLoading={this.props.saveIsLoading} history={this.props.history}/>
          }
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => ({
  isBlur: state.MainReducer.isBlur,
  reviews: state.MainReducer.reviews,
  isLoading: state.MainReducer.isLoading,
  isLoggedIn: state.MainReducer.isLoggedIn,
  isLoginModalOpen: state.MainReducer.isLoginModalOpen,
  isForgotPwdModalOpen: state.MainReducer.isForgotPwdModalOpen,
  isResetPwdModalOpen: state.MainReducer.isResetPwdModalOpen,
  isRegisterModalOpen: state.MainReducer.isRegisterModalOpen,
});

const mapDispatchToProps = (dispatch) => ({
  getNews: () => dispatch(actions.getNews()),
  saveNews: news => dispatch(actions.saveNews(news)),
  getReviews: () => dispatch(actions.getReviews()),
  saveReviews: reviews => dispatch(actions.saveReviews(reviews)),
  logout: () => dispatch(actions.logout()),
  saveUser: user => dispatch(actions.saveUser(user)),
  login: credentials => dispatch(actions.login(credentials)),
  forgotPwd: email => dispatch(actions.forgotPwd(email)),
  resetPwd: (id, forgotPwdHash, newPwd) => dispatch(actions.resetPwd(id, forgotPwdHash, newPwd)),
  register: user => dispatch(actions.register(user)),
  saveIsBlur: isBlur => dispatch(actions.saveIsBlur(isBlur)),
  checkIsLoggedIn: () => dispatch(actions.checkIsLoggedIn()),
  getECurrencies: () => dispatch(actions.getECurrencies()),
  getPaymentMethods: () => dispatch(actions.getPaymentMethods()),
  verifyEmail: (id, hash) => dispatch(actions.verifyEmail(id, hash)),
  saveIsLoading: isLoading => dispatch(actions.saveIsLoading(isLoading)),
  saveIsLoggedIn: isLoggedIn => dispatch(actions.saveIsLoggedIn(isLoggedIn)),
  saveECurrencies: (eCurrencies) => dispatch(actions.saveECurrencies(eCurrencies)),
  savePaymentMethods: (paymentMethods) => dispatch(actions.savePaymentMethods(paymentMethods)),
  saveIsLoginModalOpen: isLoginModalOpen => dispatch(actions.saveIsLoginModalOpen(isLoginModalOpen)),
  saveIsForgotPwdModalOpen: isForgotPwdModalOpen => dispatch(actions.saveIsForgotPwdModalOpen(isForgotPwdModalOpen)),
  saveIsResetPwdModalOpen: isResetPwdModalOpen => dispatch(actions.saveIsResetPwdModalOpen(isResetPwdModalOpen)),
  saveIsRegisterModalOpen: isRegisterModalOpen => dispatch(actions.saveIsRegisterModalOpen(isRegisterModalOpen)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client));