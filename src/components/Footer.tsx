import React from "react";
// import "../styles.css";

const Footer: React.FC = () => {
  return (
    <footer id="contacts" className="footer">
      <div className="footer-container">
        <div className="footer-offer">
          <h2 className="footer-heading">
            <span className="footer-light-brown">Sip, Savor, Smile.</span>
            <br />
            <span className="footer-dark-black">It’s coffee time!</span>
          </h2>

          <div className="footer-social">
            <div className="footer-icon-wrapper">
              <img
                src="img/main-page/facebook-icon.svg"
                alt="facebook"
                className="footer-icon"
              />
            </div>
            <div className="footer-icon-wrapper">
              <img
                src="img/main-page/instagram-icon.svg"
                alt="instagram"
                className="footer-icon"
              />
            </div>
            <div className="footer-icon-wrapper">
              <img
                src="img/main-page/twitter-icon.svg"
                alt="twitter"
                className="footer-icon"
              />
            </div>
          </div>
        </div>

        <div className="footer-contacts-info">
          <p className="footer-contact-title">Contact us:</p>

          <div className="footer-contact-row footer-contact-row--address">
            <a
              href="https://www.google.com/maps/place/Starbucks,+New+York,+USA"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-contact-row footer-contact-row--address"
            >
              <img
                src="img/main-page/pin-alt.svg"
                alt="Pin Icon"
                className="footer-contact-icon"
              />
              <p className="footer-contact-text">8558 Green Rd., LA</p>
              <div className="footer-line"></div>
            </a>
          </div>

          <div className="footer-contact-row">
            <a
              href="tel:+15551234567"
              className="footer-contact-row"
              rel="noopener noreferrer"
            >
              <img
                src="img/main-page/phone.svg"
                alt="Phone Icon"
                className="footer-contact-icon"
              />
              <span className="footer-contact-text">+1 (603) 555-0123</span>
              <div className="footer-line"></div>
            </a>
          </div>

          <div>
            <img
              src="img/main-page/clock.svg"
              alt="Clock Icon"
              className="footer-contact-icon"
            />
            <p className="footer-contact-text">Mon-Sat: 9:00 AM – 23:00 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
