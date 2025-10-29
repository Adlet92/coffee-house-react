import React from "react";
import Hero from "./components/Hero";
import FavoriteCoffee from "./components/FavoriteCoffee";

const App: React.FC = () => {
  return (
    <div className="page-container">
      <header className="header">
        <div className="logo">
          <img src="/img/main-page/logo.svg" alt="CoffeeShop Logo" className="logo-img" />
        </div>

        <nav className="nav">
          <ul>
            <li><a href="#favorite-coffee">Favorite Coffee</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#mobile-app">Mobile App</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>

        <a href="/menu-page/menu.html" className="menu-link">
          <div className="menu-wrapper">
            <span className="menu-text">Menu</span>
            <img src="/img/main-page/coffee-cup.svg" alt="Cup Icon" className="menu-icon" />
            <div className="header-line"></div>
          </div>
        </a>
      </header>

      <Hero />
      <FavoriteCoffee />
    </div>
  );
};

export default App;
