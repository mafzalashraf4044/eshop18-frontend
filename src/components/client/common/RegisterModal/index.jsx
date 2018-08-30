import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//  styles
import './styles.scss';

class RegisterModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        country: '',
        password: '',
        contactNumber: '',
      },
      responseMsg: '',
    };
  }

  register = () => {
    this.props.saveIsLoading(true);

    this.props.register(this.state.user).then((res) => {
      if (res.status === 200) {
        this.props.toggleModal();
      }
      this.props.saveIsLoading(false);
    }).catch((err) => {
      this.props.saveIsLoading(false);
      this.setState({
        responseMsg: err.response.data.details || err.response.data.raw 
      });

      throw new Error(err);
    });
  }

  handleChange = (event) => {
    let target = event.target;
    this.setState(prevState => ({
      user: update(prevState.user, {$merge: {[target.name]: target.value}}),
    }));
  }

  render() {
    return (
      <div className="modal-container df jc-c ai-c">
        <div className="modal-overlay" onClick={this.props.toggleModal} />
        <div className="register-modal">
          <div className="heading df jc-sb ai-c">
            <h2>Register</h2>
            <FontAwesomeIcon icon={faTimes} className="icon" onClick={this.props.toggleModal}/>
          </div>
          <div className="form">
            <div className="two-columns df jc-sb ai-c">
              <div className="form-field">
                <label className="label">First Name:</label>
                <input type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleChange} />
              </div>
              <div className="form-field">
                <label className="label">Last Name:</label>
                <input type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />
              </div>
            </div>
            <div className="two-columns df jc-sb ai-c">
              <div className="form-field">
                <label className="label">Email:</label>
                <input type="email" name="email" value={this.state.user.email} onChange={this.handleChange} />
              </div>
              <div className="form-field">
                <label className="label">Username:</label>
                <input type="text" name="username" value={this.state.user.username} onChange={this.handleChange} />
              </div>
            </div>
            <div className="two-columns df jc-sb ai-c">
              <div className="form-field">
                <label className="label">Country:</label>
                <input type="text" name="country" value={this.state.user.country} onChange={this.handleChange} />
              </div>
              <div className="form-field">
                <label className="label">Mobile/Phone Number:</label>
                <input type="text" name="contactNumber" value={this.state.user.contactNumber} onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-field">
              <label className="label">Password:</label>
              <input type="password" name="password" value={this.state.user.password} onChange={this.handleChange} />
            </div>
            {
              this.state.responseMsg &&
              <div className="err-msg">{this.state.responseMsg}</div>
            }
            <div className="btn-container" onClick={this.register}>
              <button className="btn">Register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterModal;