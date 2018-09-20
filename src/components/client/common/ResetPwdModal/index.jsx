import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  styles
import './styles.scss';

class ResetPwdModal extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      responseMsg: {type: '', text: ''},
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.resetPwd();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  resetPwd = () => {
    const id = this.getParameterByName('id', window.location.href);
    const forgotPwdHash = this.getParameterByName('forgotPwdHash', window.location.href);

    this.props.saveIsLoading(true);
    this.props.resetPwd(id, forgotPwdHash, this.state.password).then((res) => {
      if (res.status === 200) {
        this.setState({
          responseMsg: {
            type: 'success',
            text: 'Password successfully reset, kindly login.',
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

  getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  handleChange = (event) => {
    let target = event.target;
    this.setState({password: event.target.value});
  }

  render() {
    return (
      <div className="modal-container df jc-c ai-c">
        <div className="modal-overlay" onClick={this.props.toggleModal} />
        <div className="reset-pwd-modal">
          <div className="heading df jc-sb ai-c">
            <h2>Reset Password</h2>
            <i className="fa fa-times icon" onClick={this.props.toggleModal} />
          </div>

          <div className="form">
            <div className="form-field">
              <label className="label">New Password:</label>
              <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </div>
            {
              this.state.responseMsg.text &&
              <div className={classNames('df jc-sb ai-c', {'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>
                {this.state.responseMsg.text}
                <span className="fa fa-times" onClick={() => this.setState({responseMsg: {type: '', text: ''}})}></span>
              </div>
            }

            <div className="btn-container" onClick={this.resetPwd} >
              <button className="btn">Reset Password</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ResetPwdModal;