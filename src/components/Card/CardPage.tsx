import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import Loader from "../Loader";
import "./cart.css";

interface CartItem {
  id: number;
  name: string;
  size: string;
  additives: string[];
  price: number;
  discountPrice?: number;
  quantity: number;
  img?: string;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>("");
  const [orderMessage, setOrderMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : []);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    saveCart(newCart);
  };

  // const totalPrice = cart.reduce((sum, item) => {
  //   const price = isLoggedIn && item.discountPrice ? item.discountPrice : item.price;
  //   return sum + price * item.quantity;
  // }, 0);

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
    console.log("Confirm clicked. isLoggedIn:", isLoggedIn);
    if (!isLoggedIn) {
      window.location.href = "../sign-in-page/sign-in.html";
      return;
    }
    console.log("Sending POST request...");
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
  console.log("Request body:", body);

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

      localStorage.removeItem("cart");
      setCart([]);
      setOrderMessage("Thank you for your order! Our manager will contact you shortly.");
    } catch {
      setLoading(false);
      setNotification("Something went wrong. Please, try again");
      setTimeout(() => setNotification(""), 3000);
    }
  };
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
                          <p className="discount-price">${item.discountPrice.toFixed(2)}</p>
                        </>
                      ) : (
                        <p>${item.price.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                {/* <span>Total:</span> */}
                <div className="summary-left">Total:</div>
                {/* <span className="summary-price">${totalPrice.toFixed(2)}</span> */}
                <div className="summary-right">
                  {isLoggedIn ? (
                    <div className="summary-prices">
                      <span className="cart-original-price">${totalOriginalPrice.toFixed(2)}</span>
                      <span className="cart-discount-price">${totalDiscountPrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span className="summary-price">${totalOriginalPrice.toFixed(2)}</span>
                  )}
                </div>
                {/* {isLoggedIn ? (
                  <div className="summary-prices">
                    <span className="original-price">${totalOriginalPrice.toFixed(2)}</span>
                    <span className="discount-price">${totalDiscountPrice.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="summary-price">${totalOriginalPrice.toFixed(2)}</span>
                )} */}
              </div>

              <div className="cart-actions">
                <button onClick={handleConfirmOrder} disabled={loading} className="confirm-order-btn">
                  {loading ? <Loader text="Processing..." fullPage /> : "Confirm Order"}
                </button>
              </div>
            </>
          )}

          {notification && <div className="notification-error">{notification}</div>}
          {orderMessage && <div className="order-message">{orderMessage}</div>}

          {!isLoggedIn && cart.length === 0 && (
            <div className="confirm-buttons">
              <button className="sign-in-btn" onClick={() => (window.location.href = "/sign-in")}>Sign In</button>
              <button className="checkout-btn" onClick={() => (window.location.href = "/register")}>Registration</button>
            </div>
          )}
        </section>
        <Footer />
      </div>
  );
};

export default CartPage;
