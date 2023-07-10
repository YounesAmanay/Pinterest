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
import Streamer from "./streamer/Streamer";
import Onboarding from "./onboarding/Onboarding";
import useCategories from "../../../costumHooks/useCategories";
import usePinsByCategory from "../../../costumHooks/usePinsByCategory";
import useFetchBoards from "../../../costumHooks/useFetchBoards";


function Nav({ onLogout }) {
  // const [activeIcon, setActiveIcon] = useState(false);
  const dispatch = useDispatch();
  const authId = useSelector((state) => state.authUser);
  const pinsLoad = useSelector((state) => state.pinsLoad);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const { data } = useFetchBoards();
  const test = useCategories();
  const { isLoading } = usePins();
  const { pins } = usePinsByCategory(selectedCategory?.id);

  const location = useLocation();

  useEffect(() => {
    Echo.channel(`user.${authId}`).listen("UserFollowed", (e) => {
      dispatch({
        type: "SET_MESSAGES",
        message: `${e.followerName} followed you`,
      });
    });
  }, [authId]);

  return (
    <>
      <Onboarding />
      <Streamer />
      <div className="nav-container">
        <div className="logo">
          <ImPinterest2/>
        </div>
        <div className="nav">
          <Link to="/">
            <nav
              className={location.pathname === "/" ? "active" : ""}
              onClick={() =>dispatch({type:'SEARCH',search:false}) }
            >
              <BiHomeAlt />
            </nav>
          </Link>
          <Link to={`profile/${authId}`}>
            <nav
              className={location.pathname === `/profile/${authId}` ? "active" : ""}
            >
              <AiOutlineUser />
            </nav>
          </Link>
          <Link to="/chat">
            <nav
              className={location.pathname === "/chat" ? "active" : ""}
            >
              <HiOutlineChat />
            </nav>
          </Link>

          <nav
          // className={activeIcon === 4 ? "active" : ""}
          // onClick={() => setActiveIcon(4)}
          >
            <MdOutlineLibraryBooks />
          </nav>
          <nav
          // className={activeIcon === "home" ? "active" : ""}
          // onClick={() => setActiveIcon("home")}
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
