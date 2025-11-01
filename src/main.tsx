import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./components/Card/cardContext";
import CartPage from "./components/Card/CardPage";
import MenuPage from "./components/Menu/MenuPage";
import RegistrationPage from "./components/Registration/RegistrationPage";
import SignInPage from "./components/SignIn/SignInPage";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/register" element={<RegistrationPage/>} />
      </Routes>
    </Router>
    </CartProvider>
  </React.StrictMode>
);
