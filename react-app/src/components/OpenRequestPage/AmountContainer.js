import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function AmountContainer({ newAmount, setNewAmount }) {
    const user = useSelector(state => state.session.user)
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState('');
    console.log('balance', balance)

    useEffect(() => {
        if (!user) return 
        setBalance(user.balance)
    }, [user])

    useEffect(() => {
        let newError = ''

        if (newAmount <= 0) {
            newError = 'Amount cannot be zero.'
        } else if (newAmount > balance) {
            newError = 'Insufficient balance.'
        } else {
            newError = ''
        }

        if (newError.length) setError(newError)

    }, [newAmount, balance])

    return (
        <div className='note-input-div'>
            <input tpye='number' value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
            {error.length > 0 && <span>{error}</span>}
        </div>
    )
}
