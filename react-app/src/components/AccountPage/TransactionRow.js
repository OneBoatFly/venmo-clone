import React from 'react'
import { useSelector } from 'react-redux'
import { getDecimalNum } from '../../utils/getDecimalNum'
import { getTimeDifference } from '../../utils/getTimeDifference'
import './TransactionRow.css'

export default function TransactionRow({transaction}) {
    const user = useSelector(state => state.session.user);
    const diffTime = getTimeDifference(transaction.createdAt)
    const amount = getDecimalNum(transaction.amount)

  return (
    transaction.fromUserId === user.id ?
        <div className='transaction-top'>
            <img className='transaction-profile-pic' src={transaction.toUser.imageUrl} alt="" />
            <div className='transaction-info-div'>
                <span><b>You</b> paid <b>{transaction.toUser.username}</b></span>
                <span style={{ 'color': '#55585E', 'fontSize': '0.875rem' }}>{diffTime}</span>
                <span>{transaction.note}</span>
            </div>
            <span className='transaction-amount outflow'>- ${amount}</span>
        </div>
        :
        <div className='transaction-top'>
            <img className='transaction-profile-pic' src={transaction.toUser.imageUrl} alt="" />
            <div className='transaction-info-div'>
                <span><b>{transaction.fromUser.username}</b> paid <b>You</b></span>
                <span style={{ 'color': '#55585E', 'fontSize': '0.875rem' }}>{diffTime}</span>
                <span>{transaction.note}</span>
            </div>
            <span className='transaction-amount inflow'>+ ${amount}</span>
        </div>
  )
}
