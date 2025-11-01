import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Card/cardContext";

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  return (
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
      <div className="menu-wrapper">
        <div
          className="shopping-bag-icon"
          onClick={() => navigate("/cart")}
          style={{ cursor: 'pointer' }}
        >
          <img src="../img/menu-page/shopping-bag.svg" alt="Cart Icon" className="cart-icon"/>
          <span className={`cart-count ${cartCount === 0 ? "hidden" : ""}`}>{cartCount}</span>
        </div>
        <a href="/menu" className="menu-link">
          <div className="menu-wrapper">
          <span className="menu-text">Menu</span>
          <img src="/img/main-page/coffee-cup.svg" alt="Cup Icon" className="menu-icon" />
          <div className="header-line"></div>
        </div>
        </a>
      </div>
    </header>
  );
};

export default Header;
