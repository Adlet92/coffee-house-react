import React from "react";
import "../styles.css";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about">
      <h2 className="about-heading">
        <span className="about-black">Resource is</span>{" "}
        <span className="about-brown">the perfect and cozy place</span>{" "}
        <span className="about-black">where</span>{" "}
        <span className="about-black">
          you can enjoy a variety of hot beverages, relax,
        </span>{" "}
        <span className="about-black">
          catch up with friends, or get some work done.
        </span>
      </h2>

      <div className="about-gallery">
        <div className="col">
          <div className="img-wrap img1-wrap">
            <img
              src="img/main-page/about-1.svg"
              alt="Cafe view"
              className="img1"
            />
          </div>
          <div className="img-wrap img3-wrap">
            <img
              src="img/main-page/about-2.svg"
              alt="Friends in cafe"
              className="img3"
            />
          </div>
        </div>

        <div className="col">
          <div className="img-wrap img2-wrap">
            <img
              src="img/main-page/about-3.svg"
              alt="People talking"
              className="img2"
            />
          </div>
          <div className="img-wrap img4-wrap">
            <img
              src="img/main-page/about-4.svg"
              alt="Coffee moment"
              className="img4"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
