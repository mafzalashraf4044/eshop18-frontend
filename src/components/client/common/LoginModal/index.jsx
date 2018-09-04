import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  styles
import './styles.scss';

class LoginModal extends React.PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: '',
      },
      responseMsg: this.props.verifyEmailResponse,
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.login();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  login = () => {
    this.props.saveIsLoading(true);

    this.props.login(this.state.credentials).then((res) => {
      if (res.status === 200) {
        this.props.toggleModal();
        this.props.saveIsLoggedIn(true);
        this.props.saveUser(res.data.user);
        localStorage.setItem("token", res.data.token);
        this.props.history.push('dashboard');
      }

      setTimeout(() => {this.props.saveIsLoading(false);}, 1000);
    }).catch((err) => {
      this.props.saveIsLoading(false);
      this.setState({
        responseMsg: {
          type: 'err',
          text: err.response.data.details || err.response.data.raw,
        } 
      });

      throw new Error(err);
    });
  }

  handleChange = (event) => {
    let target = event.target;
    this.setState(prevState => ({
      credentials: update(prevState.credentials, {$merge: {[target.name]: target.value}}),
    }));
  }

  render() {
    return (
      <div className="modal-container df jc-c ai-c">
        <div className="modal-overlay" onClick={this.props.toggleModal} />
        <div className="login-modal">
          <div className="heading df jc-sb ai-c">
            <h2>Login</h2>
            <i className="fa fa-times icon" onClick={this.props.toggleModal} />
          </div>

          <div className="form">
            <div className="form-field">
              <label className="label">Email:</label>
              <input type="text" name="email" value={this.state.credentials.email} onChange={this.handleChange} />
            </div>
            <div className="form-field">
              <label className="label">Password:</label>
              <input type="password" name="password" value={this.state.credentials.password} onChange={this.handleChange} />
            </div>
            {
              this.state.responseMsg.text &&
              <div className={classNames({'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>{this.state.responseMsg.text}</div>
            }
            <div className="btn-container" onClick={this.login} >
              <button className="btn">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;