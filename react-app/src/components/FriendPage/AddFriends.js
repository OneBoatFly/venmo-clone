import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { fetchNonFriendUsers } from '../../store/user';
import NonFriendsDropDown from './NonFriendsDropDown';
import './AddFriends.css';

export default function AddFriends() {
    const [recipient, setRecipient] = useState('');
    const [showNonFriends, setShowNonFriends] = useState(false);
    const dispatch = useDispatch()

    const showNonFriendsRef = useRef(null);
    useEffect(() => {
        if (!showNonFriends) return;

        const closeNonFriends = (e) => {
            console.log(showNonFriendsRef)
            if (showNonFriendsRef.current) {
                if (showNonFriendsRef.current.contains(e.target)) return;
            }
            setShowNonFriends(false);
        }

        document.addEventListener('click', closeNonFriends);

        return () => document.removeEventListener('click', closeNonFriends)

    }, [showNonFriends])

    useEffect(() => {
        dispatch(fetchNonFriendUsers())
    }, [dispatch])

  return (
    <div className='friend-search-wrapper'>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
            type='text'
            name='recipient'
            placeholder='Find users here...'
            onChange={(e) => setRecipient(e.target.value)}
            value={recipient}
            onClick={() => setShowNonFriends(true)}
        ></input>
        {showNonFriends && <div ref={showNonFriendsRef} className='non-friends-drop-down-div'>
            <NonFriendsDropDown />
        </div>}
    </div>
  )
}
