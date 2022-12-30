import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOneTransaction, likeTransaction, unlikeTransaction } from '../../store/transactons';
import SideBar from '../SideBar/SideBar';
import TransactionRow from '../TransactionPage/TransactionRow';
import './StoryPage.css';
import ViewComments from './ViewComments';

export default function StoryPage() {
    const { transactionId } = useParams();
    const dispatch = useDispatch();
    const currentTransaction = useSelector(state => state.transaction.oneTransaction);
    const user = useSelector(state => state.session.user);
    
    const handleLike = (transaction) => {
        // console.log('handleLike - userTrans', transaction, transaction.likedUserIds, user.id)
        if (transaction.likedUserIds.includes(user.id)) {
            dispatch(unlikeTransaction(transaction.id, true)).then(() => {
                dispatch(fetchOneTransaction(transactionId))
            })
        } else {
            dispatch(likeTransaction(transaction.id, true)).then(() => {
                dispatch(fetchOneTransaction(transactionId))
            })
        }
    }

    useEffect(() => {
        // console.log('transactionId ------- ', transactionId)
        dispatch(fetchOneTransaction(transactionId))
    }, [dispatch, transactionId])

    return (
        <div className='transaction-page-div'>
            <SideBar />
            <div className='transaction-page'>
                <div className='transaction-body-div'>
                    {currentTransaction && 
                        <div className='transaction-single-div'>
                            <TransactionRow transaction={currentTransaction} showAmount={true} />
                            <div className='transaction-buttons-div'>
                                <div className='transaction-buttons-div-button'>
                                    <button onClick={() => handleLike(currentTransaction)} className={`transaction-icon-button ${currentTransaction.numOfLikes ? 'hasLikes' : ''}`}>
                                        <i className={`fa-sharp fa-solid fa-heart`}></i>
                                        {currentTransaction.numOfLikes > 0 && <span>{currentTransaction.numOfLikes}</span>}
                                    </button>
                                    <button className={`story-page-comment-button transaction-icon-button ${currentTransaction.numOfComments ? 'hasComments' : ''}`}>
                                        <i className={`fa-solid fa-comment`}></i>
                                        {currentTransaction.numOfComments > 0 && <span>{currentTransaction.numOfComments}</span>}
                                    </button>
                                </div>
                                <hr className='transaction-divider'></hr>
                            </div>
                            <ViewComments transaction={currentTransaction} />            
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
