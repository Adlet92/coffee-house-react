import React from "react";
import AboutSection from "./components/AboutSection";
import { CartProvider } from "./components/Card/cardContext";
import FavoriteCoffee from "./components/FavoriteCoffee";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductModal from "./components/Menu/ProductModal";
import MobileAppSection from "./components/MobileAppSection";

const App: React.FC = () => {
  return (
    <CartProvider>
    <div className="page-container">
      <Header />
      <Hero />
      <FavoriteCoffee />
      <AboutSection />
        <MobileAppSection />
        <ProductModal
        productId={1}
        category="coffee"
        index={0}
        onClose={() => {}}
        isUserLoggedIn={true}
      />
      <Footer />
      </div>
      </CartProvider>
  );
};

export default App;
