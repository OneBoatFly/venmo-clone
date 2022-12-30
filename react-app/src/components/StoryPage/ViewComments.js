import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../store/transactons';
import { getTimeDifference } from '../../utils/getTimeDifference';
import './ViewComments.css';

export default function ViewComments({transaction}) {
    const user = useSelector(state => state.session.user);
    const comments = transaction.comments;
    const dispatch = useDispatch();

    const handleDelete = (commentId) => {
        // console.log('handleDelete commentId', commentId)
        dispatch(deleteComment(commentId, transaction.id))
    }

  return (
    <div className='view-comments-wrapper'>
        {comments.map(comment => {
            const diffTime = getTimeDifference(comment.createdAt)
            return (
                <div key={comment.id} className='transaction-top'>
                    <img className='transaction-profile-pic' src={comment.user.imageUrl} alt="" />
                    <div className='transaction-info-div'>
                        <span><b>{comment.user.username}</b></span>
                        <span style={{ 'color': '#55585E', 'fontSize': '0.875rem' }}>{diffTime}</span>
                        <span>{comment.body}</span>
                    </div>
                    {comment.user.id === user.id && <button onClick={() => handleDelete(comment.id)} className='delete-comment-button'>Delete</button>}
                </div>
            )
        })}
    </div>
  )
}
