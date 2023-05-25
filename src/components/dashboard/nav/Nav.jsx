import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ImPinterest2,
  BiHomeAlt,
  AiOutlineUser,
  HiOutlineChat,
  MdOutlineLibraryBooks,
  IoIosNotificationsOutline,
  AiOutlineLogout,
} from "react-icons/all";
import "./nav.css";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePins from "../../../costumHooks/usePins";

function Nav({ onLogout }) {
  const [activeIcon, setActiveIcon] = useState(null);
  const dispatch = useDispatch();
  const authId = useSelector((state)=>state.authUser)
  const { pins } = usePins();
  const location = useLocation();

  return (
    <>
      <div className="nav-container">
        <div className="logo">
          <ImPinterest2 />
        </div>
        <div className="nav">
          <Link to="/">
            <nav
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => {
                dispatch({ type: "SET_PINS", pins });
                dispatch({
                  type: "SELECT_CATEGORY",
                  selectedCategory: null,
                });
              }}
            >
              <BiHomeAlt />
            </nav>
          </Link>
          <Link to={`profile/${authId}`}>
            <nav
               className={location.pathname === `/profile/${authId}` ? 'active' : ''}
              // onClick={() => setActiveIcon(2)}
            >
              <AiOutlineUser />
            </nav>
          </Link>
          <Link to="/chat">
            <nav
              className={location.pathname === '/chat' ? "active" : ""}
              // onClick={() => setActiveIcon(3)}

            >
              <HiOutlineChat />
            </nav>
          </Link>

          <nav
            className={activeIcon === 4 ? "active" : ""}
            onClick={() => setActiveIcon(4)}
          >
            <MdOutlineLibraryBooks />
          </nav>
          <nav
            className={activeIcon === "home" ? "active" : ""}
            onClick={() => setActiveIcon("home")}
          >
            <IoIosNotificationsOutline />
          </nav>
        </div>
        <div className="logout" onClick={onLogout}>
          <AiOutlineLogout />
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Nav;
