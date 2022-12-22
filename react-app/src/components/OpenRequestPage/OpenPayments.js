import React, { useState } from 'react';
import './OpenRequestPage.css';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { getDecimalNum } from '../../utils/getDecimalNum';
import NoteContainer from './NoteContainer';
import AmountContainer from './AmountContainer';
import { useDispatch } from 'react-redux';
import { deleteOpenRequest, editOpenRequest, fetchAllOpenRequests } from '../../store/openRequest';

export default function OpenPayments({ userPayments }) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();


  const handleDecline = async (open) => {
    const data = await dispatch(deleteOpenRequest(open.id))

    if (data) {
      setErrors(data)
    } else {
      dispatch(fetchAllOpenRequests())
    }
  }

  return (
    userPayments.map((open, idx) => {
      const diffTime = getTimeDifference(open.createdAt)
      const amount = getDecimalNum(open.amount)

      return (
        <div key={idx} className='openrequests-single-div'>
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
            </div>
            <hr></hr>
          </div>
        </div>
      )
    })
  )
}
