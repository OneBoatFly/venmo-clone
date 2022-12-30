import React from 'react'
import { useSelector } from 'react-redux';

export default function ViewComments({transaction}) {
    const user = useSelector(state => state.session.user);
    const comments = transaction.comments;

  return (
    <div className='view-comments-wrapper'>
        <div className='transaction-top'>
            <img className='transaction-profile-pic' src={transaction.toUser.imageUrl} alt="" />
            <div className='transaction-info-div'>
                <span><b>{transaction.toUser.username}</b></span>
                {/* <span style={{ 'color': '#55585E', 'fontSize': '0.875rem' }}>{diffTime}</span> */}
                <span>{transaction.note}</span>
            </div>
        </div>
    </div>
  )
}
