import React, { useEffect, useRef, useState } from "react";
import "../styles.css";

interface FavoriteCoffee {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
}

interface FavoritesResponse {
  data: FavoriteCoffee[];
  message: string;
  error: string;
}

const AUTO_SLIDE_INTERVAL = 6000;

const FavoriteCoffee: React.FC = () => {
  const [coffees, setCoffees] = useState<FavoriteCoffee[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fetch from API
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/favorites"
        );
        if (!response.ok)
          throw new Error(`Network error: ${response.status} ${response.statusText}`);

        const data: FavoritesResponse = await response.json();
        if (data.error) throw new Error(data.error);

        setCoffees(data.data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please refresh the page and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    if (!coffees.length) return;

    startAutoSlide();

    return () => stopAutoSlide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coffees]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % coffees.length);
    }, AUTO_SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? coffees.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === coffees.length - 1 ? 0 : prev + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    stopAutoSlide();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchEndX.current - touchStartX.current;
    const swipeThreshold = 50;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      swipeDistance > 0 ? prevSlide() : nextSlide();
    }

    startAutoSlide();
  };

  if (loading) {
    return (
      <section id="favorite-coffee" className="featured">
        <div className="loader">Loading favorite coffees...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="favorite-coffee" className="featured">
        <div className="error">
          <p><strong>{error}</strong></p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      </section>
    );
  }

  if (!coffees.length) {
    return (
      <section id="favorite-coffee" className="featured">
        <p className="no-data">No favorite coffees available.</p>
      </section>
    );
  }

  const currentCoffee = coffees[current];
  const imageIndex = ((currentCoffee.id - 1) % 8) + 1;
  const imagePath = `img/menu-page/coffee-${imageIndex}.svg`;

  return (
    <section
      id="favorite-coffee"
      className="featured"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="featured-heading">
        <span className="featured-black">Choose your</span>{" "}
        <span className="featured-brown">favorite</span>{" "}
        <span className="featured-black">coffee</span>
      </h2>

      <div className="featured-slider">
        <div className="slides-wrapper">
          <div className="featured-item">
            <img src={imagePath} alt={currentCoffee.name} />
            <div className="drink">
              <h3 className="drink-name">{currentCoffee.name}</h3>
              <p className="drink-description">{currentCoffee.description}</p>
              <p className="drink-price">
                ${currentCoffee.discountPrice || currentCoffee.price}
              </p>
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
