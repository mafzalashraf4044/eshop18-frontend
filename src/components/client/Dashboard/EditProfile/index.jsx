import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';

//  third party components
import Select from 'react-select';

//  constants
import {countriesList} from 'general/constants'

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class EditProfile extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      responseMsg: {type: '', text: ''},
    };
  }

  editProfile = () => {
    this.props.editProfile(this.state.user.id, {
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      username: this.state.user.username,
      country: this.state.user.country,
      contactNumber: this.state.user.contactNumber,
    }).then((res) => {
      if (res.status === 200) {
        this.props.saveUser(res.data.user);
        this.setState({
          responseMsg: {
            type: 'success',
            text: 'User profile updated successfully.',
          } 
        });
      }
    }).catch((err) => {
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
    this.setState(prevState => ({
      user: update(prevState.user, {$merge: {[target.name]: target.value}}),
    }));
  }

  render() {
    return (
      <div className="dashboard-content-edit-profile">
        <div className="heading df jc-fs ai-c">
          <i className="fa fa-edit icon" />
          <h2>Edit Profile</h2>
        </div>

        <div className="form">
          <div className="form-field">
            <label className="label">First Name:</label>
            <input type="text" name="firstName" value={this.state.user.firstName} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <label className="label">Last Name:</label>
            <input type="text" name="lastName" value={this.state.user.lastName} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <label className="label">Username:</label>
            <input type="text" name="username" value={this.state.user.username} onChange={this.handleChange} />
          </div>
          <div className="form-field">
            <label className="label">Country:</label>
            <Select
              isClearable
              isSearchable
              value={{value: this.state.user.country, label: this.state.user.country}}
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
          {
            this.state.responseMsg.text &&
            <div className={classNames('df jc-sb ai-c', {'err-msg': this.state.responseMsg.type === 'err', 'success-msg': this.state.responseMsg.type === 'success'})}>
              {this.state.responseMsg.text}
              <span className="fa fa-times" onClick={() => this.setState({responseMsg: {type: '', text: ''}})}></span>
            </div>
          }

          <div className="btn-container" onClick={this.editProfile}>
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
  saveUser: user => dispatch(actions.saveUser(user)),
  editProfile: (id, user) => dispatch(actions.editProfile(id, user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);