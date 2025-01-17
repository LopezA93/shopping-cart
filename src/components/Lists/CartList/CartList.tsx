import { FC } from "react";
import { useCart } from "../../../context/CartContext";

import styles from "./CartList.module.scss";
import { Link } from "react-router-dom";
import useResponsive from "../../../hooks/useResponsive";

const CartList: FC = () => {
  const {
    items,
    increaseQuantityOfItem,
    decreaseQuantityOfItem,
    calculateTotal,
  } = useCart();
  const isMobile = useResponsive();

  return (
    <div className={styles.cartContainer}>
      {isMobile && (
        <Link className={styles.backLink} to="/">
          ←
        </Link>
      )}
      <h1>Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className={styles.dataContainer}>
          <div className={styles.cartFooter}>
            <button className={styles.checkoutButton}>
              Checkout {calculateTotal()}€
            </button>
          </div>
          <ul className={styles.cartItems}>
            {items.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <img
                  src={item.image_url}
                  alt={item.productName}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h4>{item.productName}</h4>
                  <div className={styles.quantityControls}>
                    <button onClick={() => decreaseQuantityOfItem(item.id)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantityOfItem(item.id)}>
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p>{item.price}€</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CartList;
