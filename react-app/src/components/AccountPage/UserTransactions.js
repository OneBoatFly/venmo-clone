import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchAllTransactions } from '../../store/transactons';
import './UserTransactions.css';
import { useHistory } from 'react-router-dom';
import TransactionRow from './TransactionRow';

export default function UserTransactions({ userTransactions }) {
    // const dispatch = useDispatch();

    const handleLike = (transaction) => {
        console.log('handleLike', transaction)
    }

    const history = useHistory();
    const handleComment = (transaction) => {
        console.log('handleComment', transaction)
        history.push(`/story/${transaction.id}`)
    }


    return (
        userTransactions.map((transaction, idx) => {
            return (
                <div key={idx} className='transaction-single-div'>
                    <TransactionRow transaction={transaction} showAmount={true} />
                    <div className='transaction-buttons-div'>
                        <div className='transaction-buttons-div-button'>
                            <button onClick={() => handleLike(transaction)} className={`transaction-icon-button ${transaction.numOfLikes ? 'hasLikes' : ''}`}>
                                <i className={`fa-sharp fa-solid fa-heart`}></i>
                                {transaction.numOfLikes > 0 && <span>{transaction.numOfLikes}</span>}
                            </button>
                            <button onClick={() => handleComment(transaction)} className={`transaction-icon-button ${transaction.numOfLikes ? 'hasComments' : ''}`}>
                                <i className={`fa-solid fa-comment`}></i>
                                {transaction.numOfComments > 0 && <span>{transaction.numOfComments}</span>}
                            </button>
                        </div>
                        <hr className='transaction-divider'></hr>
                    </div>
                </div>
            )
        })
    )
}
