import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOpenRequest } from '../../store/openRequest';
import { authenticate } from '../../store/session';
import { createTransaction } from '../../store/transactons';
import { fetchAllUsers } from '../../store/user';
import AllUsersDropDown from './AllUsersDropDown';
import './PayForm.css';
import { useSocket } from '../../context/SocketContext';

export default function PayForm() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const socket = useSocket();

    const [amount, setAmount] = useState('0');
    const [recipients, setRecipients] = useState([]);
    const [toUserIds, setToUserIds] = useState([]);
    const [recipient, setRecipient] = useState('');
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [note, setNote] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false)
    const [errors, setErrors] = useState({});
    const [insufficient, setInsufficient] = useState('');
    const [complete, setComplete] = useState(false)

    const handleKeyDown = (e) => {
        const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete' || (e.key === '.'))
        if (!valid) {
            e.preventDefault();
        }
    }

    const handlePay = async () => {
        // console.log('handle pay')
        // console.log(toUserIds, amount, note, parseFloat(amount) * 100 * recipients.length > user?.balance, user?.balance)
        setHasSubmit(true)

        const numOfRecipient = recipients.length || 1
        
        if (parseFloat(amount) * 100 * numOfRecipient > user?.balance) {
            setInsufficient('Insufficient balance.')
            return;
        }

        if (Object.keys(errors).length) {
            return;
        }

        const backendErrors = [];
        for (const toUserId of toUserIds) {
            const data = await dispatch(createTransaction({
                "to_user_id": toUserId,
                "amount": amount * 100,
                "note": note
            }))

            if (data) {
                setErrors(data)
                backendErrors.append(data);
            }
        }

        if (!backendErrors.length) {
            setComplete(true)
            dispatch(authenticate())
        }        
    }

    const handleRequest = async () => {
        // console.log('handle request')
        // console.log(toUserIds, amount, note)
        setHasSubmit(true)

        if (Object.keys(errors).length) {
            return;
        }

        const backendErrors = [];
        for (const toUserId of toUserIds) {
            const data = await dispatch(createOpenRequest({
                "to_user_id": toUserId,
                "amount": amount * 100,
                "note": note
            }))
    
            if (data) {
                setErrors(data)
                backendErrors.append(data);
            }
        }

        if (!backendErrors.length) {
            setComplete(true)

            // send notification to the to_users.
            for (const toUserId of toUserIds) {
                // console.log('sending notification', toUserId)
                socket.emit('notification', {
                    to_user_id: toUserId,
                    notification_type: 'request'
                })
            }
        }
    }

    const handleDeleteRecipient = (username) => {
        const newRecipients = [...recipients]
        const newToUserIds = [...toUserIds]
        const idx = newRecipients.indexOf(username)
        newRecipients.splice(idx, 1)
        newToUserIds.splice(idx, 1)
        setRecipients(newRecipients)
        setToUserIds(newToUserIds)
    }

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [dispatch])

    useEffect(() => {
        setInsufficient('')
    }, [amount, recipients])

    useEffect(() => {
        let newErrors = {}

        if (parseFloat(amount) <= 0 || amount.length === 0) {
            newErrors.amount = 'Enter a value greanter than $0.'
        } else {
            delete newErrors.amount
        }

        if (recipients.length === 0) {
            newErrors.recipient = 'Enter a recipient.'
        } else {
            delete newErrors.recipient
        }

        if (note.length === 0) {
            newErrors.note = 'Enter some details regarding the payment.'
        } else if (note.length > 250) {
            newErrors.note = 'Note must be 250 characters or shorter.'
        } else {
            delete newErrors.note
        }

        setErrors(newErrors)

    }, [amount, recipient, recipients, note, setErrors, user])

    const showAllUsersRef = useRef(null);
    useEffect(() => {
        if (!showAllUsers) return;
        
        const closeAllUsers = (e) => {
            if (showAllUsersRef.current) {
                if (showAllUsersRef.current.contains(e.target) || e.target.className.includes('payform-input-recipient')) return;
            }
            setShowAllUsers(false);
        }

        document.addEventListener('click', closeAllUsers);

        return () => document.removeEventListener('click', closeAllUsers)

    }, [showAllUsers])

    // console.log('errors', errors)
    // console.log('hasSubmit', hasSubmit)
    // console.log('recipient', recipients)
    // console.log('toUserIds', toUserIds)
    // console.log('insufficient', insufficient)

    if (complete) return <Redirect to='/open'></Redirect>

  return (
    <div className='payform-div'>
        <span className='payform-head'>Pay & Request</span>
        <form className='payform-form'>
            <div className='payform-input-wrapper'>
                <div className={`amount-input-div payform-amount ${(errors?.amount|| insufficient) && hasSubmit ? 'hasPayErrors' : ''}`}>
                    <b>$ </b>
                    <input type='text' value={amount} size={`${amount}`.length || 1} onKeyDown={handleKeyDown} onChange={(e) => setAmount(e.target.value)} />
                </div>
                {recipients.length > 1 &&
                    <span className='payform-total'>Total: ${(amount * recipients.length).toFixed(2)}</span>
                }
                {hasSubmit && errors.amount &&
                    <div className='auth-error-div'>
                        <span>{errors.amount}</span>
                        <i className={`fa-solid fa-exclamation ${errors?.amount && hasSubmit ? 'payErrorIcon' : ''}`}></i>
                    </div>
                }
                {hasSubmit && insufficient &&
                    <div className='auth-error-div'>
                        <span>{insufficient}</span>
                        <i className={`fa-solid fa-exclamation ${insufficient && hasSubmit ? 'payErrorIcon' : ''}`}></i>
                    </div>
                }
            </div>
            <div className='payform-input-wrapper payform-input-recipient'>
                <div className={`payform-input-div payform-input-recipient ${errors?.recipient && hasSubmit ? 'hasPayErrors' : ''}`} onClick={() => setShowAllUsers(true)}>
                    <label htmlFor='recipient' className='payform-input-recipient' >To</label>
                    {recipients.map(username => {
                        return (
                            <div key={username} className='payform-username-bubble payform-input-recipient'>
                                <span className='payform-input-recipient'>{username}</span>
                                <i className="fa-solid fa-x payform-input-recipient" onClick={() => handleDeleteRecipient(username)}></i>
                            </div>
                        )
                    })}
                    <input
                        type='text'
                        name='recipient'
                        placeholder='Find users here...'
                        onChange={(e) => setRecipient(e.target.value)}
                        value={recipient}
                        className='payform-input-recipient'
                    ></input>
                </div>
                {hasSubmit && errors.recipient &&
                    <div className='auth-error-div payform-error'>
                        <span>{errors.recipient}</span>
                    </div>
                }
                {showAllUsers && <div ref={showAllUsersRef} className='all-users-drop-down-div'>
                    <AllUsersDropDown recipients={recipients} setRecipient={setRecipient} setShowAllUsers={setShowAllUsers} setRecipients={setRecipients} setToUserIds={setToUserIds} keyword={recipient}/>
                </div>}
            </div>
            <div className='payform-input-wrapper'>
                <div className={`payform-note-input-div ${errors?.note && hasSubmit ? 'hasPayErrors' : ''}`} >
                    <label htmlFor='note' className='' >Note</label>
                    <textarea
                        name='note'
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                    ></textarea>
                    <i className={`fa-solid fa-exclamation payform-note-icon ${errors?.note && hasSubmit ? 'payErrorIcon' : ''}`}></i>
                </div>
                {hasSubmit && errors.note &&
                      <div className='auth-error-div payform-error'>
                        <span>{errors.note}</span>
                    </div>
                }
            </div>            
        </form>
        <div className='payform-button-div'>
            <button onClick={handlePay}>Pay</button>
            <button onClick={handleRequest}>Request</button>
        </div>
    </div>
  )
}
