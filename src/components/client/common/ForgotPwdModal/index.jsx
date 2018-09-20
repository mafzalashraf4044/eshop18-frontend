import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  styles
import './styles.scss';

class ForgotPwdModal extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      responseMsg: {type: '', text: ''},
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.forgotPwd();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  forgotPwd = () => {
    this.props.saveIsLoading(true);    
    this.props.forgotPwd(this.state.email).then((res) => {
      if (res.status === 200) {
        this.setState({
          responseMsg: {
            type: 'success',
            text: 'We have sent you a link, kindly check your email for resetting your password.',
          } 
        });
      }

      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);
      this.setState({
        responseMsg: {
          type: 'err',
          text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.',
        } 
      });

      throw new Error(err);
    });
  }

  handleChange = (event) => {
    let target = event.target;
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <div className="modal-container df jc-c ai-c">
        <div className="modal-overlay" onClick={this.props.toggleModal} />
        <div className="forgot-pwd-modal">
          <div className="heading df jc-sb ai-c">
            <h2>Forgot Password</h2>
            <i className="fa fa-times icon" onClick={this.props.toggleModal} />
          </div>

          <div className="form">
            <div className="form-field">
              <label className="label">Email:</label>
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </div>
            {
              this.state.responseMsg.text &&
              <div className={classNames('df jc-sb ai-c', {'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>
                {this.state.responseMsg.text}
                <span className="fa fa-times" onClick={() => this.setState({responseMsg: {type: '', text: ''}})}></span>
              </div>
            }

            <div className="btn-container" onClick={this.forgotPwd} >
              <button className="btn">Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPwdModal;