import React from "react";
// import "../styles.css";

const Hero: React.FC = () => {
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
        <a href="/menu-page/menu.html" className="hero-btn">
          Menu
        </a>
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
