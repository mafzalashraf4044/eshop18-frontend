import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
      responseMsg: {type: '', text: ''},
    };
  }

  changePassword = () => {

    if (this.state.newPwd !== this.state.confirmPwd) {
      this.setState({
        responseMsg: {
          type: 'err',
          text: 'Provided passwords does not match.',
        } 
      }, () => {
        setTimeout(() => {
          this.setState({responseMsg: {type: '', text: ''}});
        }, 5000);
      });
    } else {
      this.props.changePassword(this.props.user.id, this.state.oldPwd, this.state.newPwd).then((res) => {
        if (res.status === 200) {
          this.setState({
            oldPwd: '',
            newPwd: '',
            confirmPwd: '',
            responseMsg: {
              type: 'success',
              text: 'Password changed successfully.'
            },
          }, () => {
            setTimeout(() => {
              this.setState({responseMsg: {type: '', text: ''}});
            }, 5000);
          });
        }
      }).catch((err) => {
        this.setState({
          responseMsg: {
            type: 'err',
            text: err && err.response && err.response.data ? (err.response.data.details || err.response.data.raw) : 'Something went wrong, please try again later.' ,
          } 
        }, () => {
          setTimeout(() => {
            this.setState({responseMsg: {type: '', text: ''}});
          }, 5000);
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
          <i className="fa fa-lock icon" />
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
            this.state.responseMsg.text &&
            <div className={classNames({'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>{this.state.responseMsg.text}</div>
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