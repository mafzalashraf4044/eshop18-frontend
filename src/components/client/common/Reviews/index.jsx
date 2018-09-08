import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import Slider from "react-slick";

//  styles
import './styles.scss';

const reviewsSliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: window.innerWidth < 992 ? 2 : 3,
  slidesToScroll: window.innerWidth < 992 ? 2 : 3,
  autoplay: true,
  autoplaySpeed: 8000,
};

class Reviews extends React.PureComponent {
  render() {
    return (
      <div className="reviews-container">
        <div className="reviews-heading">
          <h2>What do our Customers say about us?</h2>
        </div>

        <div className="reviews">
          <Slider {...reviewsSliderSettings}>
            {
              this.props.reviews.map((review, index) => (
                <div className="slick-item" key={index}>
                  <div className="review">
                    <div className="star-rating df jc-fs ai-c">
                      {
                        [1,2,3,4,5].map((star, i) => (
                          <div className="star-icon-container" key={i}>
                            <i className="fa fa-star star-icon" />
                          </div>
                        ))
                      }
                    </div>
                    <div className="review-title">
                      <h2>{review.title}</h2>
                    </div>
                    <div className="review-content">
                      <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    );
  }
}

export default Reviews;