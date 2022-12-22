import React from 'react';
import './FriendPage.css';

export default function AllFriends({ userPendingFroms, userPendingTos }) {

    const handleAccept = () => {
        console.log('Accept handler')
    }

    return (
        <>
            {userPendingTos.map((friend, idx) => {
                return (
                    <>
                        <div key={idx} className='friend-single-div'>
                            <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                            <div className='friend-info-div'>
                                <span className='friend-name'>{friend.username} </span>
                                <span className='friend-email'>@{friend.email}</span>
                            </div>
                            <button className='accept-friend-button' onClick={() => handleAccept(friend)}>Accept</button>
                        </div>
                        <hr className='friend-divider'></hr>
                    </>
                )
            })}
            {userPendingFroms.map((friend, idx) => {
                return (
                    <>
                        <div key={idx} className='friend-single-div'>
                            <img className='friend-profile-pic' src={friend.imageUrl} alt="" />
                            <div className='friend-info-div'>
                                <span className='friend-name'>{friend.username} </span>
                                <span className='friend-email'>@{friend.email}</span>
                            </div>
                        </div>
                        <hr className='friend-divider'></hr>
                    </>
                )
            })}
        </>
    )
}
