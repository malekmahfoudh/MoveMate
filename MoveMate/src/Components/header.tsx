import React from "react";
import MoveMateMainpageLogo from "../assets/MoveMateMainpageLogo.svg";
import menu from "../assets/menu.svg";
import '../Styles/Header.scss';

const Header: React.FC = () => {

    return (
        <header>
            <img className="menu-btn" src={menu} alt="Menu" />
            <img className="logo" src={MoveMateMainpageLogo} alt="MoveMate Logo" />
        </header>
    );
}


export default Header;