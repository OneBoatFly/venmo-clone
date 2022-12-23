import React, { useState } from 'react';
import './OpenRequestPage.css';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { getDecimalNum } from '../../utils/getDecimalNum';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOpenRequest, fetchAllOpenRequests } from '../../store/openRequest';
import { createTransaction } from '../../store/transactons';
import { authenticate } from '../../store/session';

export default function OpenPayments({ userPayments }) {
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const [selectedOpen, setSelectedOpen] = useState({});
  const [errors, setErrors] = useState('');
  const [insufficient, setInsufficient] = useState('');
  const [hasSubmit, setHasSubmit] = useState(false);

  const handleDecline = async (open) => {
    const data = await dispatch(deleteOpenRequest(open.id))

    if (data) {
      setErrors(data)
    } else {
      dispatch(fetchAllOpenRequests())
    }
  }

  const handlePay = async (open) => {
    setHasSubmit(true)
    setSelectedOpen(open)

    if (parseFloat(open.amount) > user?.balance) {
      console.log(open.amount)
      console.log(user.balance)
      setInsufficient('Insufficient balance.')
      return;
    }

    const data = await dispatch(createTransaction({
      "to_user_id": open.fromUserId,
      "amount": open.amount,
      "note": open.note
    }))

    if (data) {
      setErrors(data)
      return;
    }

    handleDecline(open)
    dispatch(authenticate())
  }

  return (
    userPayments.map((open, idx) => {
      const diffTime = getTimeDifference(open.createdAt)
      const amount = getDecimalNum(open.amount)

      return (
        <div key={idx} className='openrequests-single-div'>
          {errors && selectedOpen.id === open.id &&
            <div className='auth-error-div'>
              <span>{errors}</span>
            </div>
          }
          {hasSubmit && insufficient && selectedOpen.id === open.id &&
            <div className='auth-error-div'>
              <span>{insufficient}</span>
              <i className={`fa-solid fa-exclamation ${insufficient && hasSubmit ? 'payErrorIcon' : ''}`}></i>
            </div>
          }
          <div className='openrequests-top'>
            <img className='openrequest-profile-pic' src={open.fromUser.imageUrl} alt="" />
            <div className='openrequest-info-div'>
              <span>Request from <b>{open.fromUser.username}</b></span>
              <span style={{ 'color': '#55585E', 'fontSize': '0.875rem' }}>{diffTime}</span>
              <span>{open.note}</span>
            </div>
            <span className='openrequest-amount'>${amount}</span>
          </div>
          <div className='openrequest-buttons-div'>
            <div className='openrequest-buttons-div-button'>
              <button onClick={() => handleDecline(open)}>Decline</button>
              <button onClick={() => handlePay(open)}>Pay</button>
            </div>           
            <hr></hr>
          </div>
        </div>
      )
    })
  )
}
