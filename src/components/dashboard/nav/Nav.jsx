import { React, useState } from 'react';
import { ImPinterest2, BiHomeAlt, AiOutlineUser, HiOutlineChat, MdOutlineLibraryBooks, IoIosNotificationsOutline, AiOutlineLogout } from 'react-icons/all';
import './nav.css';
import { Outlet } from 'react-router-dom';


function Nav() {
  const [activeIcon, setActiveIcon] = useState('');
  return (
    <>
    <div className='nav-container'>
      <div className="logo">
        <ImPinterest2/>
      </div>
      <div className="nav">
      <nav
          className={activeIcon === 1 ? 'active' : ''}
          onClick={() => setActiveIcon(1)}
        >
          <BiHomeAlt />
        </nav>
        <nav
          className={activeIcon === 2 ? 'active' : ''}
          onClick={() => setActiveIcon(2)}
        >
          <AiOutlineUser/> 
        </nav>
        <nav
          className={activeIcon ===3 ? 'active' : ''}
          onClick={() => setActiveIcon(3)}
        >
          <HiOutlineChat />
        </nav>

        <nav
          className={activeIcon ===4 ? 'active' : ''}
          onClick={() => setActiveIcon(4)}
        >
          <MdOutlineLibraryBooks />
        </nav>
        <nav
          className={activeIcon === 'home' ? 'active' : ''}
          onClick={() => setActiveIcon('home')}
        >
          <IoIosNotificationsOutline />
        </nav>
      </div>
      <div className="logout">
        <AiOutlineLogout/>
      </div>
    </div>
    <Outlet/>
    </>
  )
}

export default Nav