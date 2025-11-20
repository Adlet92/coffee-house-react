import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";
import { useCart } from "./cardContext";
import "./cart.css";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [orderMessage, setOrderMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const totalOriginalPrice = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
  );
  const totalDiscountPrice = cart.reduce((sum, item) => {
  if (item.discountPrice) {
    return sum + item.discountPrice * item.quantity;
  }
  return sum + item.price * item.quantity;
}, 0);

  const handleConfirmOrder = async () => {
    if (!isLoggedIn) {
      navigate("/sign-in")
      return;
    }
    setLoading(true);

    const body = {
      items: cart.map((item) => ({
        productId: item.id,
        size: item.size,
        additives: item.additives,
        quantity: item.quantity,
      })),
      totalPrice: isLoggedIn ? totalDiscountPrice : totalOriginalPrice,
    };

    try {
      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/orders/confirm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      setLoading(false);

      if (!res.ok) {
        setNotification("Something went wrong. Please, try again");
        setTimeout(() => setNotification(""), 3000);
        return;
      }
      clearCart();
      setOrderMessage("Thank you for your order! Our manager will contact you shortly.");
    } catch {
      setLoading(false);
      setNotification("Something went wrong. Please, try again");
      setTimeout(() => setNotification(""), 3000);
    }
  };
  const hasAnyDiscount = cart.some(item => item.discountPrice);

  return (
      <div className="page-container">
        <Header />
        <section className="basket">
          <div className="cart-header">
            <h1 className="cart-name">Cart</h1>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            <>
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-column" key={item.id}>
                    <img
                      src="../img/menu-page/trash.svg"
                      className="cart-trash-img"
                      onClick={() => removeFromCart(item.id)}
                    />
                    <img src={item.img || "../img/menu-page/coffee-1.svg"} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <h3>{item.name}</h3>
                      <p>
                        {item.size}
                        {item.additives.length > 0 ? ", " + item.additives.join(", ") : ""}
                      </p>
                    </div>
                    <div className="cart-item-price">
                      {isLoggedIn && item.discountPrice ? (
                        <>
                          <p className="original-price">${item.price.toFixed(2)}</p>
                          <p className="cart-item-discount-price">${item.discountPrice.toFixed(2)}</p>
                        </>
                      ) : (
                        <p>${item.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-left">Total:</div>
                <div className="summary-right">
                  {isLoggedIn && hasAnyDiscount ? (
                    <div className="summary-prices">
                      <span className="cart-original-price">${totalOriginalPrice.toFixed(2)}</span>
                      <span className="cart-discount-price">${totalDiscountPrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="summary-price">${totalOriginalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              {isLoggedIn && (
                <div className="cart-actions">
                <button onClick={handleConfirmOrder} disabled={loading} className="confirm-order-btn">
                  {loading ? <Loader text="Processing..." fullPage /> : "Confirm Order"}
                </button>
              </div>
              )}
            </>
          )}

          {notification && <div className="notification-error">{notification}</div>}
          {orderMessage && <div className="order-message">{orderMessage}</div>}

          {!isLoggedIn && (
            <div className="confirm-buttons">
              <button className="sign-in-btn" onClick={() => (navigate("/sign-in"))}>Sign In</button>
              <button className="checkout-btn" onClick={() => (navigate("/register"))}>Registration</button>
            </div>
          )}
        </section>
        <Footer />
      </div>
  );
};

export default CartPage;
