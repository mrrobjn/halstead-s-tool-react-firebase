import React from "react";
import "../assets/layout/Header.scss";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header-container">
      <div className="nav-left">
      <div className="logo"></div>
        <NavLink>File</NavLink>
        <NavLink>Run</NavLink>
        <NavLink>Setting</NavLink>
        <NavLink>Help</NavLink>
      </div>
      <div className="nav-right">

      </div>
    </header>
  );
};

export default Header;
