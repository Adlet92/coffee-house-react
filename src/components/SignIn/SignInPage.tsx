import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./sign-in.css";

const SignInPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateLogin = (value: string) => /^[A-Za-z][A-Za-z]{2,}$/.test(value);
  const validatePassword = (value: string) => value.length >= 6 && /[^a-zA-Z0-9]/.test(value);

  useEffect(() => {
    setIsButtonDisabled(!(validateLogin(login) && validatePassword(password)));
  }, [login, password]);

  const handleLoginBlur = () => {
    if (!validateLogin(login)) {
      setLoginError("Login must be ≥ 3 letters and start with a letter");
    } else {
      setLoginError("");
    }
  };

  const handlePasswordBlur = () => {
    if (!validatePassword(password)) {
      setPasswordError("Password must be ≥ 6 chars & contain special symbol");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(false);

    const payload = { login, password };

    try {
      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        setAuthError(true);
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", login);
      window.location.href = "/menu";
    } catch {
      setAuthError(true);
    }
  };

  // const goToMenu = () => (window.location.href = "/menu");
  // const goToCart = () => (window.location.href = "/cart");

  return (
    <div className="page-container">
      <Header />
      <section className="fill-block">
        <div className="all-block">
          <h1 className="sign-in-title">Sign In</h1>
          <form id="signInForm" className="sign-in-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Login</label>
              <input
                id="loginInput"
                type="text"
                placeholder="Placeholder"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onBlur={handleLoginBlur}
                autoComplete="off"
              />
              <span className="error-message">{loginError}</span>
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Placeholder"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                 autoComplete="new-password"
              />
              <span className="error-message">{passwordError}</span>
            </div>
            <button id="signInBtn" type="submit" disabled={isButtonDisabled}>
              Sign In
            </button>
            {authError && (
              <p id="authError" className="auth-error">
                Incorrect login or password
              </p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SignInPage;
