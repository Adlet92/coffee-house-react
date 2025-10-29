import React from "react";
import AboutSection from "./components/AboutSection";
import FavoriteCoffee from "./components/FavoriteCoffee";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MobileAppSection from "./components/MobileAppSection";
// import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <Hero />
      <FavoriteCoffee />
      <AboutSection />
      <MobileAppSection />
      <Footer />
    </div>
  );
};

export default App;
