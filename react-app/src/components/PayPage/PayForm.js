import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createOpenRequest } from '../../store/openRequest';
import { fetchAllUsers } from '../../store/user';
import AllUsersDropDown from '../FriendPage/AllUsersDropDown';
import './PayForm.css'

export default function PayForm() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);
    const [recipients, setRecipients] = useState([]);
    const [toUserIds, setToUserIds] = useState([]);
    const [recipient, setRecipient] = useState('');
    // const [toUserId, setToUserId] = useState(-1);
    const [showAllUsers, setShowAllUsers] = useState(false);
    const [note, setNote] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false)
    const [errors, setErrors] = useState({})
    const [complete, setComplete] = useState(false)
   

    const handleKeyDown = (e) => {
        const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete' || (e.key === '.'))
        if (!valid) {
            e.preventDefault();
        }
    }

    const handlePay = () => {
        console.log('handle pay')
        setHasSubmit(true)

        let newErrors = {}
        if (parseFloat(amount) * 100 > user?.balance) {
            newErrors.amount = 'Insufficient balance.'
        }

        setErrors(newErrors)
    }

    const handleRequest = async () => {
        console.log('handle request')
        console.log(toUserIds, amount, note)
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
        }
    }

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    useEffect(() => {
        let newErrors = {}

        if (parseFloat(amount) <= 0 || amount.length === 0) {
            newErrors.amount = 'Enter a value greanter than $0.'
        } else if (parseFloat(amount) * 100 > user?.balance) {
            newErrors.amount = 'Insufficient balance.'
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

    }, [amount, recipient, note, setErrors, user])

    const showAllUsersRef = useRef(null);
    useEffect(() => {
        if (!showAllUsers) return;
        
        const closeAllUsers = (e) => {
            console.log(showAllUsersRef)
            if (showAllUsersRef.current) {
                if (showAllUsersRef.current.contains(e.target)) return;
            }
            setShowAllUsers(false);
        }

        document.addEventListener('click', closeAllUsers);

        return () => document.removeEventListener('click', closeAllUsers)

    }, [showAllUsers])

    console.log('errors', errors)
    console.log('recipient', recipients)
    console.log('toUserIds', toUserIds)

    if (complete) return <Redirect to='/account'></Redirect>

  return (
    <div className='payform-div'>
        <span className='payform-head'>Pay & Request</span>
        <form className='payform-form'>
            <div className='payform-input-wrapper'>
                <div className={`amount-input-div payform-amount ${errors?.amount && hasSubmit ? 'hasPayErrors' : ''}`}>
                    <b>$ </b>
                    <input type='text' value={amount} size={`${amount}`.length || 1} onKeyDown={handleKeyDown} onChange={(e) => setAmount(e.target.value)} />
                </div>
                {hasSubmit && errors.amount &&
                    <div className='auth-error-div'>
                        <span>{errors.amount} </span>
                        <i className={`fa-solid fa-exclamation ${errors?.amount && hasSubmit ? 'payErrorIcon' : ''}`}></i>
                    </div>
                }
            </div>
            <div className='payform-input-wrapper'>
                <div className={`payform-input-div ${errors?.recipient && hasSubmit ? 'hasPayErrors' : ''}`} onClick={() => setShowAllUsers(true)}>
                    <label htmlFor='recipient' className='' >To</label>
                    {recipients.map(username => {
                        return (
                            <div key={username}>{username}</div>
                        )
                    })}
                    <input
                        type='text'
                        name='recipient'
                        onChange={(e) => setRecipient(e.target.value)}
                        value={recipient}
                    ></input>
                </div>
                {hasSubmit && errors.recipient &&
                    <div className='auth-error-div payform-error'>
                        <span>{errors.recipient}</span>
                    </div>
                }
                {showAllUsers && <div ref={showAllUsersRef} className='all-users-drop-down-div'>
                    <AllUsersDropDown setRecipient={setRecipient} setShowAllUsers={setShowAllUsers} setRecipients={setRecipients} setToUserIds={setToUserIds}/>
                </div>}
            </div>
            <div className='payform-input-wrapper'>
                <div className={`payform-note-input-div ${errors?.amount && hasSubmit ? 'hasPayErrors' : ''}`} >
                    <label htmlFor='note' className='' >Note</label>
                    <textarea
                        name='note'
                        onChange={(e) => setNote(e.target.value)}
                        value={note}
                    ></textarea>
                    <i className={`fa-solid fa-exclamation payform-note-icon ${errors?.amount && hasSubmit ? 'payErrorIcon' : ''}`}></i>
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
