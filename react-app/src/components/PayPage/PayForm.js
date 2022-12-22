import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../store/user';
import AllUsersDropDown from '../FriendPage/AllUsersDropDown';
import './PayForm.css'

export default function PayForm() {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [toUserId, setToUserId] = useState(-1);
    const [showAllUsers, setShowAllUsers] = useState(true);
    const [note, setNote] = useState('');
    const [hasSubmit, setHasSubmit] = useState(false)
    const [errors, setErrors] = useState({})
   

    const handleKeyDown = (e) => {
        const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete' || (e.key === '.'))
        if (!valid) {
            e.preventDefault();
        }
    }

    const handlePay = () => {
        console.log('handle pay')
        setHasSubmit(true)
    }

    const handleRequest = () => {
        console.log('handle request')
        console.log(recipient, amount, note)
        setHasSubmit(true)
    }

    useEffect(() => {
        dispatch(fetchAllUsers())
    }, [])

    useEffect(() => {
        let newErrors = {}

        if (parseFloat(amount) <= 0 || amount.length === 0) {
            newErrors.amount = 'Amount cannot be zero.'
        } else if (parseFloat(amount) * 100 > user?.balance) {
            newErrors.amount = 'Insufficient balance.'
        } else {
            delete newErrors.amount
        }

        setErrors(newErrors)

    }, [amount, setErrors, user])

  return (
    <div className='payform-div'>
        <span className='payform-head'>Pay & Request</span>
        <form className='payform-form'>
            <div className='payform-input-wrapper'>
                <div className={`amount-input-div ${errors?.amount && hasSubmit ? 'hasError' : ''}`}>
                    <b>$ </b>
                    <input type='text' value={amount} size={`${amount}`.length || 1} onKeyDown={handleKeyDown} onChange={(e) => setAmount(e.target.value)} />
                </div>
            </div>
            <div className='payform-input-wrapper'>
                <div className='' onClick={() => setShowAllUsers(true)} onBlur={() => setShowAllUsers(false)}>
                    <div className=''>
                        <label htmlFor='recipient' className='' >To</label>
                        <input
                            type='text'
                            name='recipient'
                            onChange={(e) => setRecipient(e.target.value)}
                            value={recipient}
                        ></input>
                    </div>
                    <i className="fa-solid fa-exclamation"></i>
                </div>
                {showAllUsers && <AllUsersDropDown setRecipient={setRecipient} setShowAllUsers={setShowAllUsers} setToUserId={setToUserId} />}
                {hasSubmit && errors.recipient &&
                    <div className='auth-error-div'>
                        <span>{errors.recipient}</span>
                    </div>
                }
            </div>
            <div className='payform-input-wrapper'>
                <div className='' >
                    <div className=''>
                        <label htmlFor='note' className='' >Note</label>
                        <input
                            type='text'
                            name='note'
                            onChange={(e) => setNote(e.target.value)}
                            value={note}
                        ></input>
                    </div>
                    <i className="fa-solid fa-exclamation"></i>
                </div>
                {hasSubmit && errors.note &&
                    <div className='auth-error-div'>
                        <span>{errors.note}</span>
                    </div>
                }
            </div>            
        </form>
        <button onClick={handlePay}>Pay</button>
        <button onClick={handleRequest}>Request</button>
    </div>
  )
}
