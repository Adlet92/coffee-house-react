import React from "react";
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate("/menu");
  };
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-heading">
          <span className="hero-heading-white">Enjoy</span>{" "}
          <span className="hero-heading-accent">
            premium coffee at our charming café
          </span>
        </h1>
        <p className="hero-subtext">
          With its inviting atmosphere and delicious coffee options, Coffee
          House is the perfect destination for coffee lovers seeking a relaxing
          experience.
        </p>
        <button className="hero-btn" onClick={handleMenuClick}>
          Menu
        </button>
      </div>

      <video
        className="hero-video"
        autoPlay
        loop
        muted
        playsInline
        src="/video/enjoy_coffee.mp4"
      />
    </section>
  );
};

export default Hero;
