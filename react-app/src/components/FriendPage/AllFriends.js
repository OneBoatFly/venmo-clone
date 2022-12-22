import React from 'react';
import './FriendPage.css';

export default function AllFriends({ userFriends }) {

    const handleUnfriend = () => {
        console.log('unfriend handler')
    }

    return (
        userFriends.map((friend, idx) => {
            return (
                <>
                    <div key={idx} className='friend-single-div'>
                        <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                        <div className='friend-info-div'>
                            <span className='friend-name'>{friend.username} </span>
                            <span className='friend-email'>@{friend.email}</span>
                        </div>
                        <button className='unfriend-button' onClick={() => handleUnfriend(friend)}>Unfriend</button>
                    </div>
                    <hr className='friend-divider'></hr>
                </>
            )
        })
    )
}
