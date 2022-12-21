import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function NoteContainer({ newNote, setNewNote }) {
    const [error, setError] = useState('');

    useEffect(() => {
        let newError = ''

        if (newNote.length === 0) {
            newError = 'Note cannot be empty.'
        } else if (newNote.length > 250) {
            newError = 'Note must be 250 characters or shorter'
        } else {
            newError = ''
        }

        if (newError.length) setError(newError)

    }, [newNote])

  return (
    <div className='note-input-div'>
        <input type='text' value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        {error.length > 0 && <span>{error}</span>}
    </div>
  )
}
