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
                        <span>Request to {open.toUser.username}</span>
                        {console.log(open.createdAt)}
                        <span>Request sent {diffTime}</span>
                        <span>{open.note}</span>
                    </div>
                    <span>${amount}</span>
                </div>
                <div>
                    <button>Cancel</button>
                    <button>Edit</button>
                </div>
            </div>
        )
    })
  )
}
