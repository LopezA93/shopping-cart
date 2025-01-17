import { FC } from "react";
import styles from "./ProductCard.module.scss";
import { useCart } from "../../../context/CartContext";
import { updateFavoriteStatus } from "../../../services/products";

interface ProductCardProps {
  id: string;
  image_url: string;
  stock: number;
  productName: string;
  price: number;
  productDescription: string;
  favorite: number;
  onFavoriteToggle: (id: string, newFavoriteStatus: number) => void;
}

const ProductCard: FC<ProductCardProps> = ({
  id,
  image_url,
  stock,
  productName,
  price,
  productDescription,
  favorite,
  onFavoriteToggle,
}) => {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    if (stock > 0) {
      addItemToCart({ id, productName, price, image_url, quantity: 1 });
    }
  };

  const handleFavoriteClick = async () => {
    const newFavoriteStatus = favorite === 1 ? 0 : 1;
    await updateFavoriteStatus(id, newFavoriteStatus);
    onFavoriteToggle(id, newFavoriteStatus);
  };

  return (
    <div className={styles.card}>
      <button
        className={styles.favoriteButton}
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite"
      >
        {favorite == 1 ? "⭐" : "☆"}
      </button>
      <img src={image_url} alt={productName} />

      <div className={styles.productDetail}>
        <div>
          <h3>{productName}</h3>
          <p>{productDescription}</p>
        </div>
        <div className={styles.details}>
          <span className={styles.price}>{price}€</span>
        </div>
      </div>
      <div className={styles.bottomBox}>
        <span
          className={`${styles.stock} ${
            stock === 0 ? styles["out-of-stock"] : ""
          }`}
        >
          {stock > 0 ? `${stock} left` : "Out of stock"}
        </span>
        <button onClick={() => handleAddToCart()} disabled={stock === 0}>
          + Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
