import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class ChangePassword extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      oldPwd: '',
      newPwd: '',
      confirmPwd: '',
      responseMsg: '',
    };
  }

  changePassword = () => {

    if (this.state.newPwd !== this.state.confirmPwd) {
      this.setState({
        responseMsg: 'Password does not match.',
      });
    } else {
      this.props.changePassword(this.props.user.id, this.state.oldPwd, this.state.newPwd).then((res) => {
        if (res.status === 200) {
          this.setState({
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            responseMsg: '',
          });
        }
      }).catch((err) => {
        this.setState({
          responseMsg: err.response.data.details || err.response.data.raw 
        });
  
        throw new Error(err);
      });
    }

  }

  handleChange = (event) => {
    let target = event.target;
    this.setState(prevState => ({
      [target.name]: target.value,
    }));
  }

  render() {
    return (
      <div className="dashboard-content-change-password">
        <div className="heading df jc-fs ai-c">
          <FontAwesomeIcon icon={faLock} className="icon" />
          <h2>Change Password</h2>
        </div>

        <div className="form">
          <div className="form-field">
            <label className="label">Old Password:</label>
            <input type="password" name="oldPwd" value={this.state.oldPwd} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <label className="label">New Password:</label>
            <input type="password" name="newPwd" value={this.state.newPwd} onChange={this.handleChange}/>
          </div>
          <div className="form-field">
            <label className="label">Confirm Password:</label>
            <input type="password" name="confirmPwd" value={this.state.confirmPwd} onChange={this.handleChange}/>
          </div>
          {
            this.state.responseMsg &&
            <div className="err-msg">{this.state.responseMsg}</div>
          }
          <div className="btn-container" onClick={this.changePassword}>
            <button className="btn">Save Changes</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.MainReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  changePassword: (id, oldPwd, newPwd) => dispatch(actions.changePassword(id, oldPwd, newPwd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);