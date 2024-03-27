import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashPage from "./Components/splashPage";
import MainPage from "./MainPage";
import "./Styles/App.scss";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
