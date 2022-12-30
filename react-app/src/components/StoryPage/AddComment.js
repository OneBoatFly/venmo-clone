import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../store/transactons';
import './AddComment.css';

export default function AddComment({ transaction }) {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [error, setError] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        setHasSubmit(true);

        if (error.length) return;
        dispatch(createComment({body}, transaction.id))
            .then(() => {
                setBody('')
                setHasSubmit(false)
            })
    }

    useEffect(() => {
        if (body.length === 0 || body.length > 250) setError('Sorry, we were unable to comment your story.')
        else setError('')
    }, [body])


  return (
    <div className={`add-comment-wrapper`}>
        <form onSubmit={(e) => handleAdd(e)}>
            <div className={`add-comment-input ${error.length > 0 && hasSubmit ? 'hasPayErrors' : ''}`}>
                <img className='transaction-profile-pic add-comment-profile-pic' src={user.imageUrl} alt="" />
                <input
                    placeholder='Write a comment ...'
                    type='text'
                    value={body}
                    onChange={e => setBody(e.target.value)}
                ></input>
                <i className={`fa-solid fa-exclamation add-comment-error-icon ${error.length > 0 && hasSubmit ? 'payErrorIcon' : ''}`}></i>
            </div>
            <input type="submit" style={{"display": "none"}} />
        </form>
        {hasSubmit && error.length > 0 && 
            <div className='auth-error-div payform-error'>
                <span>{error}</span>
            </div>
        }      
    </div>
  )
}
