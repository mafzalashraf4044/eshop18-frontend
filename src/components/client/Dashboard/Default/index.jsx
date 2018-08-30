import React from 'react';

//  third party libraries
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  third party components
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <FontAwesomeIcon icon={faUser} className="icon" />
          <h2>Account Summary</h2>
        </div>
        
        <table className="table table-bordered table-condensed">
          <tbody>
            <tr>
              <td className="c1">Name: </td>
              <td className="c2">{this.props.user.firstName} {this.props.user.lastName}</td>
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
              <td className="c2">{moment(this.props.user.createdAt).format('DD-MM-YYYY')}</td>
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