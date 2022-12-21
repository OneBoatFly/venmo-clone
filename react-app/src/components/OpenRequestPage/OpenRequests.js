import React, { useState } from 'react';
import './OpenRequestPage.css';
import { getTimeDifference } from '../../utils/getTimeDifference';
import { getDecimalNum } from '../../utils/getDecimalNum';
import NoteContainer from './NoteContainer';
import AmountContainer from './AmountContainer';

export default function OpenRequests({ userRequests }) {
    const [inEdit, setInEdit] = useState(false);
    const [selectedOpen, setSelectedOpen] = useState({});
    const [newNote, setNewNote] = useState('');
    const [newAmount, setNewAmount] = useState(null);

    const handleEdit = (open) => {
        console.log('in edit handler')
        console.log(open)
        setInEdit(true)
        setSelectedOpen(open)
        setNewNote(open.note)
        setNewAmount(open.amount)
    }

    const handleCancel = (open) => {

    }

    const handleUpdate = (open) => {
        console.log('in update handler')
        console.log(newNote)
        console.log(newAmount)
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
                            <NoteContainer newNote={newNote} setNewNote={setNewNote} />
                            :
                            <span>{open.note}</span>
                        }
                    </div>
                    {inEdit && selectedOpen.id === open.id ?
                        <AmountContainer newAmount={newAmount} setNewAmount={setNewAmount}/>
                        :
                        <span className='openrequest-amount'>${amount}</span>
                    }
                </div>
                <div className='openrequest-buttons-div'>
                    <div className='openrequest-buttons-div-button'>
                        <button onClick={() => handleCancel(open)}>Cancel</button>
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
