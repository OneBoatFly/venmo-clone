import React from 'react';
import './OpenRequestPage.css';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { getDecimalNum } from '../../utils/getDecimalNum';

export default function OpenRequests({ userRequests }) {    

  return (
    userRequests.map((open, idx) => {
        const diffTime = getTimeDifference(open.createdAt)
        const amount = getDecimalNum(open.amount)

        return (
            <div key={idx} className='openrequests-single-div'>
                <div className='openrequests-top'>
                    <img className='openrequest-profile-pic' src={open.toUser.imageUrl} alt=""/>
                    <div className='openrequest-info-div'>
                        <span>Request to <b>{open.toUser.username}</b></span>
                        <span style={{'color':'#55585E', 'fontSize':'0.875rem'}}>{diffTime}</span>
                        <span>{open.note}</span>
                    </div>
                    <span className='openrequest-amount'>${amount}</span>
                </div>
                <div className='openrequest-buttons-div'>
                    <div className='openrequest-buttons-div-button'>
                        <button>Cancel</button>
                        <button>Edit</button>
                    </div>
                    <hr></hr>
                </div>
            </div>
        )
    })
  )
}
