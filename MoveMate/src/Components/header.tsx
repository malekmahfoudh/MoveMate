import React from "react";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MoveMateMainpageLogo from "../assets/MoveMateMainpageLogo.svg";
// import menuicon from "../assets/menuicon.svg";
// import Menu from "./menu";
import "../Styles/Header.scss";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
  }, []);

  const openMenu = (): void => {
    console.log("menu open")
    setIsMenuOpen(true);
  };

  return (
    <>
      <header>
        {/* <img
          className="menu-btn"
          onClick={openMenu}
          src={menuicon}
          alt="Menu"
        /> */}
        <img className="logo" src={MoveMateMainpageLogo} alt="MoveMate Logo" />
      </header>
      {/* {userId && isMenuOpen && (
        <Menu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          userId={userId}
        />
      )} */}
    </>
  );
};

export default Header;
