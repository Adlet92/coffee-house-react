import React, { useEffect, useState } from "react";
import { getImageNumber } from "../../utils/getImageNumber";
import Footer from "../Footer";
import Header from "../Header";
import "./menu.css";
import ProductModal from "./ProductModal";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
}

interface ProductWithDetails extends Product {
  sizes: Record<string, { size: string; price: string; discountPrice?: string }>;
  additives: { name: string; price: string; discountPrice?: string }[];
}

const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [activeCategory, setActiveCategory] = useState("coffee");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("coffee");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const categories = [
    { name: "Coffee", icon: "/img/menu-page/coffee-icon.png" },
    { name: "Tea", icon: "/img/menu-page/tea-icon.png" },
    { name: "Dessert", icon: "/img/menu-page/dessert-icon.png" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products"
      );
       if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Invalid response format");
      }
      setProducts(data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === activeCategory
  );

  return (
    <div className="page-container">
      <Header />
      <section className="offer">
        <div className="offer-container">
          <h1 className="offer-heading">
            Behind each of our cups<br /> hides an{" "}
            <span className="highlight">amazing surprise</span>
          </h1>
          <div className="offer-filters">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={`filter-btn ${
                  activeCategory === cat.name.toLowerCase() ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.name.toLowerCase())}
              >
                <img
                  src={cat.icon}
                  alt={`${cat.name} icon`}
                  className="filter-btn-icon"
                />
                <div className="filet-btn-text">
                  <span className="filter-btn-normal">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="featured-container">
          {loading && <div className="loader">Loading menu...</div>}
          {error && (
            <div className="error">Failed to load products. Try again later.</div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="no-products">No products found in this category.</p>
          )}

          {!loading &&
            !error &&
            filtered.map((product, index) => (
              <div
                key={product.id}
                className="coffee-card"
                onClick={() => {
                  setSelectedProduct(product.id);
                  setSelectedCategory(activeCategory);
                  setSelectedIndex(index);
                }}
              >
                <div className="container-coffee-img">
                  <img
                    src={`/img/menu-page/${activeCategory}-${getImageNumber(activeCategory, index)}.svg`}
                    alt={product.name}
                    className="coffee-img"
                  />
                </div>
                <div className="product">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="price-container">
                    {product.discountPrice ? (
                      <>
                        <span className="discount-price">
                          ${product.discountPrice}
                        </span>
                        <span className="original-price">${product.price}</span>
                      </>
                    ) : (
                      <span className="product-price">${product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {selectedProduct && (
        <ProductModal
          productId={selectedProduct}
          category={selectedCategory}
          index={selectedIndex}
          onClose={() => setSelectedProduct(null)}
          isUserLoggedIn={false}
        />
      )}
      <Footer />
    </div>
  );
};

export default MenuPage;
