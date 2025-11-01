import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./registration.css";

const streetsByCity: Record<string, string[]> = {
  "New York": ["Wall St", "Broadway", "5th Ave", "Lexington", "Park", "Church", "Spring", "Madison", "Hudson", "Bond"],
  Paris: ["Rivoli", "Saint Germain", "Montmartre", "Opera", "Louvre", "Bastille", "Temple", "Haussmann", "Rennes", "Trocadero"],
  Tokyo: ["Shibuya", "Shinjuku", "Akiba", "Ginza", "Asakusa", "Roppongi", "Meguro", "Shinagawa", "Ueno", "Kanda"],
};

const RegistrationPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [house, setHouse] = useState("");
  const [payment, setPayment] = useState("");
  const [streetOptions, setStreetOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const validateLogin = () => {
    const valid = /^[A-Za-z]{3,}$/.test(login.trim());
    setErrors((prev) => ({ ...prev, login: valid ? "" : "Login must start with a letter and be ≥ 3 chars." }));
    return valid;
  };

  const validatePassword = () => {
    const valid = /^(?=.*[^A-Za-z0-9]).{6,}$/.test(password);
    setErrors((prev) => ({ ...prev, password: valid ? "" : "Min 6 chars + 1 special symbol" }));
    return valid;
  };

  const validateConfirm = () => {
    const valid = password === confirmPassword;
    setErrors((prev) => ({ ...prev, confirmPassword: valid ? "" : "Passwords don't match" }));
    return valid;
  };

  const validateCity = () => {
    const valid = city !== "";
    setErrors((prev) => ({ ...prev, city: valid ? "" : "Select a city" }));
    return valid;
  };

  const validateStreet = () => {
    const valid = street !== "";
    setErrors((prev) => ({ ...prev, street: valid ? "" : "Select a street" }));
    return valid;
  };

  const validateHouse = () => {
    const houseNum = Number(house);
    const valid = houseNum > 1;
    setErrors((prev) => ({ ...prev, house: valid ? "" : "Must be > 1" }));
    return valid;
  };

  const validatePayment = () => {
    const valid = payment !== "";
    setErrors((prev) => ({ ...prev, payment: valid ? "" : "Choose payment" }));
    return valid;
  };

  useEffect(() => {
    const allValid =
      validateLogin() &&
      validatePassword() &&
      validateConfirm() &&
      validateCity() &&
      validateStreet() &&
      validateHouse() &&
      validatePayment();

    setIsButtonDisabled(!allValid);
  }, [login, password, confirmPassword, city, street, house, payment]);

  useEffect(() => {
    if (city) {
      setStreetOptions(streetsByCity[city]);
      setStreet("");
    } else {
      setStreetOptions([]);
      setStreet("");
    }
  }, [city]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError("");

    const body = {
      login: login.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      city,
      street,
      houseNumber: Number(house),
      paymentMethod: payment,
    };

    try {
      const res = await fetch("https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        setBackendError(error.message || "Registration failed.");
        return;
      }

      alert("Registration successful!");
      window.location.href = "/sign-in";
    } catch {
      setBackendError("Network error.");
    }
  };

  return (
    <div className="page-container">
      <Header />
      <section className="fill-block">
        <div className="registration-container">
          <h2 className="registration-title">Registration</h2>
          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="input-label">Login</label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} onBlur={validateLogin} />
                <small className="error-msg">{errors.login}</small>
              </div>
              <div className="form-group">
                <label className="input-label">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={validatePassword} />
                <small className="error-msg">{errors.password}</small>
              </div>
              <div className="form-group">
                <label className="input-label">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onBlur={validateConfirm} />
                <small className="error-msg">{errors.confirmPassword}</small>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="input-label">City</label>
                <select value={city} onChange={(e) => setCity(e.target.value)} onBlur={validateCity}>
                  <option value="">Choose city</option>
                  {Object.keys(streetsByCity).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <small className="error-msg">{errors.city}</small>
              </div>
              <div className="form-group">
                <label className="input-label">Street</label>
                <select value={street} onChange={(e) => setStreet(e.target.value)} disabled={streetOptions.length === 0} onBlur={validateStreet}>
                  <option value="">Select street</option>
                  {streetOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <small className="error-msg">{errors.street}</small>
              </div>
              <div className="form-group">
                <label className="input-label">House number</label>
                <input type="number" value={house} onChange={(e) => setHouse(e.target.value)} onBlur={validateHouse} />
                <small className="error-msg">{errors.house}</small>
              </div>
            </div>

            <div className="payment-block">
              <label>Pay by</label>
              <div className="payment-options">
                <label className="input-label">
                  <input type="radio" name="payment" value="cash" checked={payment === "cash"} onChange={(e) => setPayment(e.target.value)} />
                  Cash
                </label>
                <label className="input-label">
                  <input type="radio" name="payment" value="card" checked={payment === "card"} onChange={(e) => setPayment(e.target.value)} />
                  Card
                </label>
              </div>
              <small className="error-msg">{errors.payment}</small>
            </div>

            <button type="submit" className="register-btn" disabled={isButtonDisabled}>
              Registration
            </button>
            {backendError && <p className="backend-error">{backendError}</p>}
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
