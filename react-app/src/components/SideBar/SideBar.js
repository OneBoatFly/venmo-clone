import React, { useEffect, useState } from 'react';
import LogoutButton from '../Auth/LogoutButton';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PayReqButt from './PayReqButt';
import './SideBar.css';
import { getDecimalNum } from '../../utils/getDecimalNum';
import { useSocket } from '../../context/SocketContext';
import { fetchAllOpenRequests } from '../../store/openRequest';
import { fetchAllFriends } from '../../store/friend';

export default function SideBar() {
  const user = useSelector(state => state.session.user);
  const amount = getDecimalNum(user?.balance)
  const socket = useSocket();
  const userOpens = useSelector(state => state.openReqPay.openRequests);
  const openRequestCounter = userOpens?.RequestFroms?.length + userOpens?.RequestTos?.length;
  const pendingFroms = useSelector(state => state.friend.pendingFroms);
  const pendingTos = useSelector(state => state.friend.pendingTos);
  const pendingFriendsCounter = pendingFroms?.length + pendingTos?.length;
  
  const [requestUnread, setRequestUnread] = useState(false);
  const [friendUnread, setFriendUnread] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllOpenRequests());
    dispatch(fetchAllFriends());
  }, [dispatch])

  useEffect(() => {
    if (user && socket) {
      socket.emit("inbox", {
        inbox: `inbox-${user.id}`
      });

      socket.on("notification", (data) => {
        switch (data) {
          case 'request':
            setRequestUnread(true);
            dispatch(fetchAllOpenRequests());
            break;
          case 'friend':
            setFriendUnread(true);
            dispatch(fetchAllFriends());
            break;
          default: break;
        }
      });
    }
  }, [socket, user, dispatch]);

return (
    <nav className='sidebar-div'>
      {user &&
        <>
          <div className='sidebar-single-div'>
            {user ? 
              <NavLink to='/account' exact={true} className='vinmo-a'>
                <span className='vinmo-span'>Vinmo</span>
              </NavLink>            
            :
              <NavLink to='/' exact={true} className='vinmo-a'>
                <span className='vinmo-span'>Vinmo</span>
              </NavLink>
            }
          </div>
          <div className='sidebar-single-div profile-container'>
            <img src={user.imageUrl} alt='' className='side-bar-profile-pic'/>
            <div className='sidebar-name-email-div'>
              <span>Hi, {user.username}</span>
              <NavLink to={`/transactions`}>@{user.email}</NavLink>
            </div>
          </div>
          <PayReqButt />
          <div className='sidebar-single-div'>
            <span className='sidebar-balance'>${amount} in Vinmo</span>
          </div>
          <div className='sidebar-single-div sidebar-menu'>
            <NavLink to='/transactions'>My Transactions</NavLink>

            <NavLink to='/open' className={`sidebar-notification-div ${requestUnread ? 'hasUnread' : ''}`} onClick={() => setRequestUnread(false)}>
              <div>Open Request</div>
              {openRequestCounter > 0 && <span>{openRequestCounter}</span>}
            </NavLink>

            <NavLink to='/friends' className={`sidebar-notification-div ${friendUnread ? 'hasUnread' : ''}`} onClick={() => setFriendUnread(false)}>
              <div>Friends</div>
              {pendingFriendsCounter > 0 && <span>{pendingFriendsCounter}</span>}
            </NavLink>

            {/* <NavLink to='/search' onClick={(e) => e.preventDefault()}>Search - feature to come</NavLink> */}
            <LogoutButton />
          </div>
        </>
      }
    </nav>
  );
}
