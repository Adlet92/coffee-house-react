import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./Card/cardContext";

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isSignInPage = location.pathname === "/sign-in";
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (loggedIn && storedUsername) {
      setUsername(storedUsername);
    } else {
      setUsername(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setUsername(null);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header className="header">
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: 'pointer' }}
      >
        <img src="/img/main-page/logo.svg" alt="CoffeeShop Logo" className="logo-img" />
      </div>

      {isHomePage ? (
        <nav className="nav">
          <ul>
            <li><a href="#favorite-coffee">Favorite Coffee</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#mobile-app">Mobile App</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
        </nav>
      ) : (
       !isSignInPage && (
          username ? (
            <div className="user-info">
              <span style={{ fontSize: "16px" }}>Hello, <strong>{username}</strong></span>
                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => navigate("/sign-in")}
            >
              Login
            </button>
          )
        )
      )}
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
