import React from 'react';

//  third party libraries
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class ConfirmationModal extends React.PureComponent {

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.confirmAction();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className="modal-container df jc-c ai-c">
        <div className="modal-overlay" onClick={() => this.props.toggleModal(null)} />
        <div className="confirmation-modal">
          <div className="heading df jc-sb ai-c">
            <h2>{this.props.title}</h2>
            <i className="fa fa-times icon" onClick={() => this.props.toggleModal(null)} />
          </div>

          <div className="modal-body">
            <div className="txt">
              {this.props.confirmationTxt}
            </div>

            <div className="btn-container" onClick={this.props.confirmAction}>
              <button className="btn">{this.props.confirmBtnTxt}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;