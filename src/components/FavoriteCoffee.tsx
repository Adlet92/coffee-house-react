import React, { useState } from "react";
import "../styles.css";

type Coffee = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const coffeeData: Coffee[] = [
  {
    id: 1,
    name: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk.",
    price: "$5.50",
    image: "img/main-page/coffee-slider-1.svg",
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    description:
      "Rich espresso with steamed milk, vanilla syrup, and caramel drizzle for a sweet, creamy flavor.",
    price: "$6.20",
    image: "img/main-page/coffee-slider-2.svg",
  },
  {
    id: 3,
    name: "Iced Mocha",
    description:
      "A refreshing mix of espresso, chocolate syrup, and milk poured over ice for the perfect chill.",
    price: "$5.80",
    image: "img/main-page/coffee-slider-3.svg",
  },
];

const FavoriteCoffee: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? coffeeData.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === coffeeData.length - 1 ? 0 : prev + 1));

  const coffee = coffeeData[current];

  return (
    <section id="favorite-coffee" className="featured">
      <h2 className="featured-heading">
        <span className="featured-black">Choose your</span>{" "}
        <span className="featured-brown">favorite</span>{" "}
        <span className="featured-black">coffee</span>
      </h2>

      <div className="featured-slider">
        <div className="slides-wrapper">
          <div className="featured-item">
            <img src={coffee.image} alt={coffee.name} />
            <div className="drink">
              <h3 className="drink-name">{coffee.name}</h3>
              <p className="drink-description">{coffee.description}</p>
              <p className="drink-price">{coffee.price}</p>
            </div>
          </div>
        </div>

        <button className="slider-btn left-btn" onClick={prevSlide}>
          <img
            src="img/main-page/button-icon-dark-left.svg"
            alt="Previous"
            className="slider-btn-icon"
          />
        </button>

        <button className="slider-btn right-btn" onClick={nextSlide}>
          <img
            src="img/main-page/button-icon-dark-right.svg"
            alt="Next"
            className="slider-btn-icon"
          />
        </button>
      </div>
    </section>
  );
};

export default FavoriteCoffee;
