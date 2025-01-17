import { FC, useEffect, useState } from "react";
import ProductCard from "../../Cards/ProductCard/ProductCard";
import { getProducts, getFavoriteProducts } from "../../../services/products";
import { Link } from "react-router-dom";
import useResponsive from "../../../hooks/useResponsive";
import { useCart } from "../../../context/CartContext";
import styles from "./ProductList.module.scss";

const ProductList: FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const isMobile = useResponsive();
  const { items } = useCart();

  const fetchProducts = async () => {
    try {
      const allProducts = await getProducts();
      const favoriteProducts = await getFavoriteProducts();
      setProducts(allProducts);
      setFavorites(favoriteProducts);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (id: string, newFavoriteStatus: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, favorite: newFavoriteStatus }
          : product
      )
    );

    if (newFavoriteStatus === 1) {
      const newFavorite = products.find((product) => product.id === id);
      if (newFavorite) {
        setFavorites((prevFavorites) => [
          ...prevFavorites,
          { ...newFavorite, favorite: newFavoriteStatus },
        ]);
      }
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== id)
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading)
    return (
      <div className={styles.messageContainer}>
        <p className={styles.loadingMessage}>Loading products...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.messageContainer}>
        <p className={styles.errorMessage}> Error fetching products</p>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1>Product List</h1>
        {isMobile && (
          <div>
            <Link className={styles.linkCart} to="/cart">
              🛒 Cart{" "}
              {items.length > 0 && (
                <span className={styles.counter}>{items.length}</span>
              )}
            </Link>
          </div>
        )}
      </div>
      <div className={styles.filterContainer}>
        <button
          className={`${styles.filterButton} ${
            !showFavorites ? styles.active : ""
          }`}
          onClick={() => setShowFavorites(false)}
        >
          All Products
        </button>
        <button
          className={`${styles.filterButton} ${
            showFavorites ? styles.active : ""
          }`}
          onClick={() => setShowFavorites(true)}
        >
          Favorites
        </button>
      </div>
      <div className={styles.productGrid}>
        {(showFavorites ? favorites : products).map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image_url={product.image_url}
            stock={product.stock}
            productName={product.productName}
            price={product.price}
            productDescription={product.productDescription}
            favorite={product.favorite}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
