import React from "react";
// import "../styles.css";

const MobileAppSection: React.FC = () => {
  return (
    <section id="mobile-app" className="contacts">
      <div className="contacts-content">
        <h2 className="contacts-heading">
          <span className="contacts-brown">Download</span>{" "}
          <span className="contacts-black">our apps</span>
          <br />
          <span className="contacts-black">to start ordering</span>
        </h2>

        <p className="contacts-subtext">
          Download the Resource app today and experience the comfort of ordering
          your favorite coffee from wherever you are
        </p>

        <div className="contacts-buttons">
          <button className="contacts-btn">
            <img
              src="img/main-page/icon-apple.svg"
              alt="App Store"
              className="contacts-btn-icon"
            />
            <div className="contacts-btn-text">
              <span className="contacts-btn-small">Available on the</span>
              <span className="contacts-btn-bold">App Store</span>
            </div>
          </button>

          <button className="contacts-btn">
            <img
              src="img/main-page/icon-google.svg"
              alt="Google Play"
              className="contacts-btn-icon"
            />
            <div className="contacts-btn-text">
              <span className="contacts-btn-small">Available on</span>
              <span className="contacts-btn-bold">Google Play</span>
            </div>
          </button>
        </div>
      </div>

      <div className="contacts-image">
        <img
          src="img/main-page/mobile-screens.svg"
          alt="Mobile App Screenshot"
        />
      </div>
    </section>
  );
};

export default MobileAppSection;
