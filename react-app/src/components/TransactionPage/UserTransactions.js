import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compareTime } from '../../utils/compareTime';
import { likeTransaction, unlikeTransaction } from '../../store/transactons';
import TransactionRow from './TransactionRow';
import './UserTransactions.css';

export default function UserTransactions() {
    const userTransactions = useSelector(state => state.transaction.userTransactions);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [userTransactionsArr, setUserTransactions] = useState([])

    const handleLike = (transaction) => {
        // console.log('handleLike - userTrans', transaction, transaction.likedUserIds, user.id)
        if (transaction.likedUserIds.includes(user.id)) dispatch(unlikeTransaction(transaction.id, true))
        else dispatch(likeTransaction(transaction.id, true))
    }

    const history = useHistory();
    const handleComment = (transaction) => {
        // console.log('handleComment', transaction)
        history.push(`/story/${transaction.id}`)
    }

    useEffect(() => {
        let userTransArr = []
        if (userTransactions) userTransArr = Object.values(userTransactions)
        userTransArr.sort(compareTime)

        setUserTransactions(userTransArr);
    }, [userTransactions])

    return (
        userTransactionsArr.map((transaction, idx) => {
            return (
                <div key={idx} className='transaction-single-div'>
                    <TransactionRow transaction={transaction} showAmount={true} />
                    <div className='transaction-buttons-div'>
                        <div className='transaction-buttons-div-button'>
                            <button onClick={() => handleLike(transaction)} className={`transaction-icon-button ${transaction.numOfLikes ? 'hasLikes' : ''}`}>
                                <i className={`fa-sharp fa-solid fa-heart`}></i>
                                {transaction.numOfLikes > 0 && <span>{transaction.numOfLikes}</span>}
                            </button>
                            <button onClick={() => handleComment(transaction)} className={`transaction-icon-button ${transaction.numOfComments ? 'hasComments' : ''}`}>
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
