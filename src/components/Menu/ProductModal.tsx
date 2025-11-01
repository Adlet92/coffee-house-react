import React, { useEffect, useState } from "react";
import { getImageNumber } from "../../utils/getImageNumber";
import "./menu.css";

type Size = {
  [key: string]: {
    size: string;
    price: string;
    discountPrice?: string;
  };
};

type Additive = {
  name: string;
  price: string;
  discountPrice?: string;
};

interface ProductWithDetails {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice?: string;
  category: string;
  sizes: Size;
  additives: Additive[];
}

interface ProductModalProps {
  productId: number | null;
  category: string;
  index: number;
  onClose: () => void;
  isUserLoggedIn?: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  productId,
  category,
  index,
  onClose,
  isUserLoggedIn = false,
}) => {
  const [product, setProduct] = useState<ProductWithDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState("s");
  const [selectedAdditives, setSelectedAdditives] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com/products/${productId}`
        );
        if (!response.ok) throw new Error("Failed to load product details");

        const { data }: { data: ProductWithDetails } = await response.json();
        setProduct(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleToggleAdditive = (name: string) => {
    setSelectedAdditives((prev) =>
      prev.includes(name)
        ? prev.filter((a) => a !== name)
        : [...prev, name]
    );
  };

  const calculatePrice = () => {
    if (!product) return 0;

    const sizeData = product.sizes[selectedSize];
    const basePrice = isUserLoggedIn && sizeData.discountPrice
      ? parseFloat(sizeData.discountPrice)
      : parseFloat(sizeData.price);

    const additivesPrice = selectedAdditives.reduce((acc, name) => {
      const additive = product.additives.find((a) => a.name === name);
      return acc + (additive ? parseFloat(additive.price) : 0);
    }, 0);

    return basePrice + additivesPrice;
  };

   const createTooltipContent = (price: string, discountPrice?: string) => {
    if (isUserLoggedIn && discountPrice) {
      return (
        <span className="tooltip-price">
          <s>${price}</s> <strong>${discountPrice}</strong>
        </span>
      );
    }
    return <span className="tooltip-price">${price}</span>;
  };

  const price = calculatePrice();

  if (!productId) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-icon" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          {loading && <p className="modal-loading">Loading...</p>}
          {error && <p className="modal-error">{error}</p>}

          {!loading && product && (
            <>
              <img
                src={`/img/menu-page/${category}-${getImageNumber(category, index)}.svg`}
                alt={product.name}
                className="modal-img"
              />
              <div className="modal-info">
                <h2 className="modal-name">{product.name}</h2>
                <p className="modal-description">{product.description}</p>

                <div className="modal-sizes">
                  <h4 className="size-title">Size</h4>
                  <div className="size-options">
                    {Object.entries(product.sizes).map(([key, size]) => (
                      <button
                        key={key}
                        className={`size-btn ${selectedSize === key ? "active" : ""}`}
                        onClick={() => setSelectedSize(key)}
                        onMouseEnter={() => setVisibleTooltip(`size-${key}`)}
                        onMouseLeave={() => setVisibleTooltip(null)}
                      >
                        <div className="size-circle">{key.toUpperCase()}</div>
                        <div className="size-volume">{size.size}</div>

                        <div
                          className={`tooltip ${
                            visibleTooltip === `size-${key}` ? "visible" : ""
                          }`}
                        >
                          {createTooltipContent(size.price, size.discountPrice)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-additives">
                  <h4 className="additives-title">Additives</h4>
                  <div className="additive-options">
                    {product.additives.map((additive, idx) => (
                      <button
                        key={idx}
                        className={`additive-btn ${
                          selectedAdditives.includes(additive.name) ? "active" : ""
                        }`}
                        onClick={() => handleToggleAdditive(additive.name)}
                        onMouseEnter={() => setVisibleTooltip(`add-${idx}`)}
                        onMouseLeave={() => setVisibleTooltip(null)}
                      >
                        <div className="additive-circle">{idx + 1}</div>
                        <span>{additive.name}</span>
                        <div
                          className={`tooltip ${
                            visibleTooltip === `add-${idx}` ? "visible" : ""
                          }`}
                        >
                          {createTooltipContent(
                            additive.price,
                            additive.discountPrice
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="modal-price">
                  <span className="modal-final-price">Total:</span>
                  <span className="modal-final-price">${price.toFixed(2)}</span>
                </div>

                <button className="add-to-cart-btn">Add to cart</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
