import React from 'react';

//  third party libraries
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

//  redux
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/MainActionCreators';

class Default extends React.PureComponent {
  render() {
    return (
      <div className="dashboard-content-default">
        <div className="heading df jc-fs ai-c">
          <i className="fa fa-user icon" />
          <h2>Account Summary</h2>
        </div>
        
        <table className="table table-bordered table-condensed">
          <tbody>
            <tr>
              <td className="c1">Name: </td>
              <td className="c2">{this.props.user.firstName} {this.props.user.lastName} {this.props.user.isVerified ? <span className="user-verified"><i className="fa fa-user-shield icon" /></span> : ''}</td>
            </tr>
            <tr>
              <td className="c1">Email: </td>
              <td className="c2">{this.props.user.email}</td>
            </tr>
            <tr>
              <td className="c1">Username: </td>
              <td className="c2">{this.props.user.username}</td>
            </tr>
            <tr>
              <td className="c1">Country: </td>
              <td className="c2">{this.props.user.country}</td>
            </tr>
            <tr>
              <td className="c1">Mobile/Phone Number: </td>
              <td className="c2">{this.props.user.contactNumber}</td>
            </tr>
            <tr>
              <td className="c1">Account Type: </td>
              <td className="c2">Personal</td>
            </tr>
            <tr>
              <td className="c1">Member Since: </td>
              <td className="c2">{new Date(this.props.user.createdAt).toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.MainReducer.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Default);