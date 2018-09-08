import React from 'react';

//  third party libraries
import classNames from 'classnames';
import PropTypes from 'prop-types';

//  styles
import './styles.scss';

class FAQ extends React.PureComponent {
  render() {
    return (
      <div className="page-faq">
        <div className="faq-item">
          <h1>1. How to register in eBUYexhange.com?</h1>
          <p>It`s very simple, Just click on Register then fill up form and follow instruction. To active your account click on activation link sent you by mail. you will find mail on Inbox or Spam or Junk folder.</p>
        </div>

        <div className="faq-item">
          <h1>2. Where to send money?</h1>
          <p>After place order you will receive a mail with order information (check your Inbox or Spam or Junk Folder) then send money as per order form instruction.</p>
        </div>

        <div className="faq-item">
          <h1>3. How to buy / deposit e-Currency?</h1>
          <p>Please read this instruction.</p>
        </div>

        <div className="faq-item">
          <h1>4. How to sell / withdrawal E-Currency?</h1>
          <p>Please read this instruction.</p>
        </div>

        <div className="faq-item">
          <h1>5. How to exchange e-Currency?</h1>
          <p>Please read this instruction.</p>
        </div>

        <div className="faq-item">
          <h1>6. How to apply card?</h1>
          <p>This option temporally unavailable.</p>
        </div>

        <div className="faq-item">
          <h1>7. What kind of information need to confirm order?</h1>
          <p>We just need your MTCN or Money Transfer Reference or Batch No. or Bank Wire Information.</p>
        </div>

        <div className="faq-item">
          <h1>8. How long will take time to arrive money to EX4U receiver account ?</h1>
          <p>If you sent by Western Union or Money Gram it will arrive almost Instantly, it may need 1-24 banking hours to collect/cash. If you send by Bank Wire it may take 2-4 working days to available in our account.</p>
        </div>

        <div className="faq-item">
          <h1>9. Can I cancel an order?</h1>
          <p>You can cancel your order unless it has already been executed. Executed orders are not reversible (simply because it is impossible to do). After received fund if order cancel for any Problem or Fraud Activity we will deduct our commission/service charge and balance will back you.</p>
        </div>

        <div className="faq-item">
          <h1>10. Delivery & Payment Validity?</h1>
          <p>After received money we generally complete order within 1-3 working days. Sometime client send money and provide wrong Account No. which not possible to complete order. Even sometime they don`t contact with us. In this case we will wait up to 6 month for client reply, if no response within 6 month that fund will be frozen and not claimable for future!! </p>
        </div>
      </div>
    );
  }
}

export default FAQ;