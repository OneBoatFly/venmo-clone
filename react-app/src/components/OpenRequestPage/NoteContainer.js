import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './EditContainers.css'

export default function NoteContainer({ newNote, setNewNote, errors, setErrors }) {
    const [error, setError] = useState('')

    useEffect(() => {
        let newError = ''

        if (newNote.length === 0) {
            newError = 'Enter some details regarding the payment.'
        } else if (newNote.length > 250) {
            newError = 'Note must be 250 characters or shorter.'
        } else {
            newError = ''
        }

        setError(newError)
        if (newError.length) {
            setErrors(oldErrors => {
                oldErrors.note = newError
                return oldErrors
            })
        } else {
            setErrors(oldErrors => {
                delete oldErrors.note
                return oldErrors
            })
        }

    }, [newNote, setErrors])

  return (
    <div className={`note-input-div ${error ? 'hasError': ''}`}>
        <input type='text' value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        {error && <span className='edit-error-span'>{error}</span>}
    </div>
  )
}
