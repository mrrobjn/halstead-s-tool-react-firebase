import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/layout/Sidebar.scss";
const SideBar = () => {
  return (
    <div className="side-bar-container">
      <div className="side-bar-top">
        <NavLink to='/'>
          <i className="fa-solid fa-house"></i>
        </NavLink>
        <NavLink to='/file' >
          <i className="fa-solid fa-file-code"></i>
        </NavLink>
        <NavLink to='/report'>
          <i className="fa-solid fa-print"></i>
        </NavLink>
      </div>
      <div className="side-bar-bottom">
        <NavLink>
          <i className="fa-regular fa-circle-user"></i>
        </NavLink>
        <NavLink>
          <i className="fa-solid fa-gear"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
