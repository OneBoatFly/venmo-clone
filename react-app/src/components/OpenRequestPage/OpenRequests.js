import React, { useState } from 'react';
import './OpenRequestPage.css';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { getDecimalNum } from '../../utils/getDecimalNum';
import NoteContainer from './NoteContainer';
import AmountContainer from './AmountContainer';
import { useDispatch } from 'react-redux';
import { deleteOpenRequest, editOpenRequest, fetchAllOpenRequests } from '../../store/openRequest';

export default function OpenRequests({ userRequests }) {
    const [inEdit, setInEdit] = useState(false);
    const [selectedOpen, setSelectedOpen] = useState({});
    const [newNote, setNewNote] = useState('');
    const [newAmount, setNewAmount] = useState(null);
    const [hasBErrors, sethasBErrors] = useState(false);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleEdit = (open) => {
        setInEdit(true)
        setSelectedOpen(open)
        setNewNote(open.note)
        setNewAmount(open.amount / 100)
    }

    const handleCancel = async (open) => {
        const data = await dispatch(deleteOpenRequest(open.id))

        if (data) {
            setErrors(data)
            sethasBErrors(true)
        } else {
            setInEdit(false);
            dispatch(fetchAllOpenRequests())
        }
    }

    const handleUpdate = async (open) => {
        if (Object.keys(errors).length) return;

        const data = await dispatch(editOpenRequest({
            "amount": newAmount * 100,
            "note": newNote
        }, open.id))

        if (data) {
            setErrors(data)
            sethasBErrors(true)
        } else {
            setInEdit(false);
            dispatch(fetchAllOpenRequests())
        }

    }

  return (
    userRequests.map((open, idx) => {
        const diffTime = getTimeDifference(open.createdAt)
        const amount = getDecimalNum(open.amount)

        return (
            <div key={idx} className='openrequests-single-div'>
                <div className='openrequests-top'>
                    <img className='openrequest-profile-pic' src={open.toUser.imageUrl} alt=""/>
                    <div className='openrequest-info-div'>
                        <span>Request to <b>{open.toUser.username}</b></span>
                        <span style={{'color':'#55585E', 'fontSize':'0.875rem'}}>{diffTime}</span>
                        {inEdit && selectedOpen.id === open.id ? 
                            <NoteContainer newNote={newNote} setNewNote={setNewNote} setErrors={setErrors} hasBErrors={hasBErrors}/>
                            :
                            <span>{open.note}</span>
                        }
                    </div>
                    {inEdit && selectedOpen.id === open.id ?
                        <AmountContainer newAmount={newAmount} setNewAmount={setNewAmount} setErrors={setErrors} hasBErrors={hasBErrors} />
                        :
                        <span className='openrequest-amount'>${amount}</span>
                    }
                </div>
                <div className='openrequest-buttons-div'>
                    <div className='openrequest-buttons-div-button'>
                        {inEdit && selectedOpen.id === open.id ?
                            <button onClick={() => setInEdit(false)}>Exit</button>
                            :
                            <button onClick={() => handleCancel(open)}>Cancel</button>
                        }                        
                        {inEdit && selectedOpen.id === open.id ? 
                            <button onClick={() => handleUpdate(open)}>Update</button>
                            :
                            <button onClick={() => handleEdit(open)}>Edit</button>
                        }
                    </div>
                    <hr></hr>
                </div>
            </div>
        )
    })
  )
}
