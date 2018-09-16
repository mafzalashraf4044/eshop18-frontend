import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import Select from 'react-select';

//  constatns
import countriesList from './countriesList'

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
      responseMsg: {type: '', text: ''},
    };
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.register();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  register = () => {
    this.props.saveIsLoading(true);

    this.props.register(this.state.user).then((res) => {
      if (res.status === 200) {
        this.setState({
          responseMsg: {
            type: 'success',
            text: 'Registration successful, kindly check your email for verifcation.',
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
      }, () => {
        setTimeout(() => {
          this.setState({responseMsg: {type: '', text: ''}});
        }, 5000);
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
            <i className="fa fa-times icon" onClick={this.props.toggleModal}/>
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
                <Select
                  isClearable
                  isSearchable
                  maxMenuHeight={200}
                  className="react-select"
                  classNamePrefix="react-select"
                  onChange={(opt) => {
                    this.setState(prevState => ({
                      user: update(prevState.user, {$merge: {country: opt ? opt.value : ''}}),
                    }))
                  }}
                  options={countriesList}
                />
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
              this.state.responseMsg.text &&
              <div className={classNames({'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>{this.state.responseMsg.text}</div>
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