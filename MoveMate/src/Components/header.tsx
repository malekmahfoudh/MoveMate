import React from "react";
import MoveMateMainpageLogo from "../assets/MoveMateMainpageLogo.svg";
import "../Styles/Header.scss";

const Header: React.FC = () => {
  return (
    <>
      <header>
        <img className="logo" src={MoveMateMainpageLogo} alt="MoveMate Logo" />
      </header>
    </>
  );
};

export default Header;
