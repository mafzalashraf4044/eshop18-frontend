import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Slider from "react-slick";
import { Link } from "react-router-dom";

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

//  styles
import './styles.scss';

const newsSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 16000,
};

class Footer extends React.PureComponent {
  render() {
    return (
      <div className="footer-container">
        <div className="main-footer df jc-sb ai-fs">
          <div className="news-container">
            <div className="footer-heading">
              <h2>Latest News</h2>
            </div>
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

          <div className="links-container">
            <div className="footer-heading">
              <h2>Links</h2>
            </div>
            
            <ul className="links">
              <li className="df jc-fs ai-c">
                <i className="fa fa-angle-right angle-icon" />
                <Link className="df jc-c ai-c" to="/buy"><span>Buy / deposit</span></Link> 
              </li>
              <li className="df jc-fs ai-c">
                <i className="fa fa-angle-right angle-icon" />
                <Link className="df jc-c ai-c" to="/sell"><span>Sell / Withdrawal</span></Link>
              </li>
              <li className="df jc-fs ai-c">
                <i className="fa fa-angle-right angle-icon" />
                <Link className="df jc-c ai-c" to="/exchange"><span>Exchange</span></Link>
              </li>
              <li className="df jc-fs ai-c">
                <i className="fa fa-angle-right angle-icon" />
                <Link className="df jc-c ai-c" to="/faq"><span>Rules</span></Link>
              </li>
              <li className="df jc-fs ai-c">
                <i className="fa fa-angle-right angle-icon" />
                <Link className="df jc-c ai-c" to="/faq"><span>FAQ</span></Link>
              </li>
            </ul>
          </div>

          <div className="contact-us-container">
            <div className="footer-heading">
              <h2>Contact us</h2>
            </div>

            <div className="contact-us">
              <p>admin@eshop18.com</p>
              <p>eshop18@gmail.com (Google talk)</p>
              <p>ebuy.exchange (Skype)</p>
              <p>eshop18@hotmail.com</p>
              <p>eshop18@yahoo.com</p>
            </div>
          </div>
        </div>
        <div className="sub-footer df jc-c ai-c">
          <p>Copyright 2018 &copy; eshop18 Ltd. All rights reserved.</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  news: state.MainReducer.news,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);