import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Slider from "react-slick";

//  custom components
import CurrencyCalculator from 'components/client/common/CurrencyCalculator';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/MainActionCreators';

//  styles
import './styles.scss';

const newsSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 16000,
};

class Home extends React.PureComponent {
  render() {
    return (
      <div className="home">
        <div className="banner-wrapper">
          <div className="banner df jc-fs ai-c">
          <div className="site-intro-container df fd-c jc-c ai-c">
              <div className="site-intro">
                <h1 className="title">eBUYexhange – THE E-CURRENCY EXCHANGE EXPERTS</h1>
                <p className="txt">We provide best rates, buy / deposit, sell / withdrawal and exchange E-currency with trust</p>
              </div>
              <div className="news-container">
                <div className="news">
                  <Slider {...newsSliderSettings}>
                    {
                      this.props.news.map((news, index) => (
                        <div className="slick-item" key={index}>
                          <div className="news-item">
                            <div className="news-title">
                              <h2>{news.title}</h2>
                            </div>
                            <div className="news-content">
                              <p>{news.content.length < 200 ? news.content : news.content.slice(0, 200) + '...'}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </Slider>
                </div>
              </div>
              <div className="certificates-container df fw jc-sb ai-c">
                <div className="certificates-container-1">
                  <img src={require('assets/images/paypal.png')} alt="paypal" />
                  <img src={require('assets/images/bitcoin.png')} alt="bitcoin" />
                  <img src={require('assets/images/cgold.png')} alt="cgold" />
                  <img src={require('assets/images/litecoin.png')} alt="litecoin" />
                </div>
                <div className="certificates-container-2">
                  <img src={require('assets/images/wire.png')} alt="wire" />
                  <img src={require('assets/images/webmoney.png')} alt="webmoney" />
                  <img src={require('assets/images/ccoin.png')} alt="ccoin" />
                  <img src={require('assets/images/perfectmoney.png')} alt="perfectmoney" />                
                </div>
              </div>
            </div>
            
            {
              this.props.eCurrencies.length > 0 && this.props.paymentMethods.length > 0 &&
              <CurrencyCalculator eCurrencies={this.props.eCurrencies} paymentMethods={this.props.paymentMethods} currencyCalculator={this.props.currencyCalculator} isLoggedIn={this.props.isLoggedIn} saveIsLoginModalOpen={this.props.saveIsLoginModalOpen} />
            }
          </div>
        </div>

        <div className="about-us-container df jc-fs ai-fs">
          <div className="currency-info">
            <table className="table table-custom table-striped table-condensed">
              <thead>
                <tr>
                  <th>#</th>
                  <th>We Accept</th>
                  <th>Reserves</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.eCurrencies.map((eCurrency, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{eCurrency.title}</td>
                      <td>{eCurrency.reserves} USD</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="about-us">
            <img src={require('assets/images/about.png')} alt="about" />
            <p>
              <span className="bold">We are the official &amp; authorize exchanger/merchant of c-gold.com &amp; egopay.com.</span>
              &nbsp;Our exchanger <span className="bold">ebuyexchange.com</span> is one of biggest and well known companies in this market, we are certified exchanger of most major electronic currencies. We were regularly awarded in various polls, made by different online magazines about finances, Our team counts tens of qualified workers from different countries, among those are certified accountants, lawyers, former bank employees, specialists in security and other spheres, related to finances. We have partnership with variety financial structures and serious law companies, our branches and representatives are located all around the world, so we are performing your orders in shortest terms at any time of day or night. We will be glad to provide you almost any legal financial service possible. Our staff is speaking many languages, and we will surely find common language with any customer!We are the official &amp; authorize exchanger/merchant of c-gold.com, egopay.com , perfectmoney.com
            </p>
          </div>
        </div>

        <div className="our-services">
          <div className="our-services-txt">
            <h2>OUR SERVICES</h2>
            <p>Here you can buy / deposit, sell / withdrawal and exchange E-currency. Our site provides fast and secure exchanges with the lowest fees. Please Signup or Login to use our services</p>
          </div>
          <div className="services df jc-sb ai-c">
            <div className="service buy">
              <div className="service-icon-container df jc-c ai-c">
                <i className="fa fa-credit-card service-icon" />
              </div>
              <div className="service-description">
                <h2>BUY / DEPOSIT</h2>
                <p>You can buy / deposit from a variety of E-currencies, by paying us amount in USD using the selected transfer option</p>
              </div>
            </div>
            <div className="service sell">
              <div className="service-icon-container df jc-c ai-c">
                <i className="fa fa-money-bill-alt service-icon" />
              </div>
              <div className="service-description">
                <h2>SELL / WITHDRAWAL</h2>
                <p>You can sell / withdrawal out your E-currency to us, you will get the amount in USD using the selected transfer option</p>
              </div>
            </div>
          
            <div className="service exchange">
              <div className="service-icon-container df jc-c ai-c">
                <i className="fa fa-sync service-icon" />
              </div>
              <div className="service-description">
                <h2>EXCHANGE</h2>
                <p>You can exchange E-currency, you will pay the amount in selected E-currency, and will receive equavalent amount of exchanged E-currency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.MainReducer.news,
  eCurrencies: state.MainReducer.eCurrencies,
  paymentMethods: state.MainReducer.paymentMethods,
  isLoggedIn: state.MainReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  currencyCalculator: params => dispatch(actions.currencyCalculator(params)),
  saveIsLoginModalOpen: isLoginModalOpen => dispatch(actions.saveIsLoginModalOpen(isLoginModalOpen)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);