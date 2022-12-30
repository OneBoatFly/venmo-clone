import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFriends } from '../../store/friend';
import SideBar from '../SideBar/SideBar';
import AllFriends from './AllFriends';
import PendingFriends from './PendingFriends';
import './FriendPage.css';
import AddFriends from './AddFriends';
import SideBarMobile from '../SideBar/SideBarMobile';

export default function FriendPage() {
    const [active, setActive] = useState('Friends');
    const friends = useSelector(state => state.friend.friends);
    const pendingFroms = useSelector(state => state.friend.pendingFroms);
    const pendingTos = useSelector(state => state.friend.pendingTos);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllFriends())
    }, [dispatch])

    return (
        <div className='friend-page-div'>
            <SideBar />
            <SideBarMobile />            
            <div className='friend-page'>
                <h1 className='friend-head'>My Friends</h1>
                <AddFriends />
                <div className='friend-tag'>
                    <button className={`friend-button ${active === 'Friends' ? 'friend-active' : ''}`} onClick={() => { setActive('Friends') }}>Friends</button>
                    <button className={`friend-button ${active === 'Pendings' ? 'friend-active' : ''}`} onClick={() => { setActive('Pendings') }}>Pendings</button>
                </div>
                {active === 'Friends' &&
                    <div className='friends-body-div'>
                        <AllFriends userFriends={friends || []} />
                        {/* Friends */}
                    </div>
                }
                {active === 'Pendings' &&
                    <div className='friends-body-div'>
                        <PendingFriends userPendingFroms={pendingFroms || []} userPendingTos={pendingTos || []} />
                    </div>
                }            
            </div>
        </div>
    )
}
