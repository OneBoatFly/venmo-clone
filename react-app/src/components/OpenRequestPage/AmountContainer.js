import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function AmountContainer({ newAmount, setNewAmount, errors, setErrors }) {
    const user = useSelector(state => state.session.user)
    const [balance, setBalance] = useState(newAmount * 100);
    const [error, setError] = useState('')

    useEffect(() => {
        if (!user) return 
        setBalance(user.balance)
    }, [user])

    useEffect(() => {
        let newError = ''

        if (parseFloat(newAmount) <= 0 || newAmount.length === 0) {
            newError = 'Enter a value greanter than $0.'
        } else if (parseFloat(newAmount) * 100 > balance) {
            newError = 'Insufficient balance.'
        } else {
            newError = ''
        }

        setError(newError)
        if (newError.length) {
            setErrors(oldErrors => {
                oldErrors.amount = newError
                return oldErrors
            })
        } else {
            setErrors(oldErrors => {
                delete oldErrors.amount
                return oldErrors
            })            
        }

    }, [newAmount, balance, setErrors])

    const handleKeyDown = (e) => {
        const valid = (e.key === 'Backspace') || /[0-9]/.test(e.key) || (e.key === 'ArrowLeft') || (e.key === 'ArrowRight') || (e.key === 'ArrowDown') || (e.key === 'ArrowUp') || (e.key === 'Tab') || (e.key === 'Delete' || (e.key === '.'))
        if (!valid) {
            e.preventDefault();
        }
    }

    return (
        <div className='edit-amount-input-div'>
            <div className={`amount-input-div ${error ? 'hasError': ''}`}>
                <b>$ </b>
                <input type='text' value={newAmount} size={`${newAmount}`.length || 1} onKeyDown={handleKeyDown} onChange={(e) => setNewAmount(e.target.value)} />
            </div>
            {error && <span className='edit-error-span-amount'>{error}</span>}
        </div>
    )
}
