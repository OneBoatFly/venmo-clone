import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchAllTransactions } from '../../store/transactons';
import './AccountPage.css';
import { useHistory } from 'react-router-dom';
import TransactionRow from './TransactionRow';

export default function Transaction({ userTransactions }) {
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
                    <TransactionRow transaction={transaction}/>
                    <div className='transaction-buttons-div'>
                        <div className='transaction-buttons-div-button'>
                            <button onClick={() => handleLike(transaction)}>
                                <i className="fa-sharp fa-solid fa-heart"></i>
                            </button>
                            <button onClick={() => handleComment(transaction)}>
                                <i className="fa-solid fa-comment"></i>
                            </button>
                        </div>
                        <hr></hr>
                    </div>
                </div>
            )
        })
    )
}
