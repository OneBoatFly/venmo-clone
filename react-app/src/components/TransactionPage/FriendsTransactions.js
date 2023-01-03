import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { likeTransaction, unlikeTransaction } from '../../store/transactons';
import { compareTime } from '../../utils/compareTime';
import TransactionRow from './TransactionRow';
import './UserTransactions.css';

export default function FriendsTransactions() {
    const friendsTransactions = useSelector(state => state.transaction.friendsTransactions);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [friendsTransactionsArr, setFriendsTransactions] = useState([])

    const handleLike = (transaction) => {
        // console.log('handleLike - friendsTrans', transaction, user.id, transaction.likedUserIds, transaction.likedUserIds.includes(user.id))
        if (transaction.likedUserIds.includes(user.id)) dispatch(unlikeTransaction(transaction.id, false))
        else dispatch(likeTransaction(transaction.id, false))
    }

    const history = useHistory();
    const handleComment = (transaction) => {
        // console.log('handleComment', transaction)
        history.push(`/story/${transaction.id}`)
    }

    useEffect(() => {
        let friendsTransArr = []
        if (friendsTransactions) friendsTransArr = Object.values(friendsTransactions)
        friendsTransArr.sort(compareTime)

        setFriendsTransactions(Object.values(friendsTransArr));
    }, [friendsTransactions])

    return (
        friendsTransactionsArr.map((transaction, idx) => {
            return (
                <div key={idx} className='transaction-single-div'>
                    <TransactionRow transaction={transaction} showAmount={false} />
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
