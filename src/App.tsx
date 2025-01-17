import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useResponsive from "./hooks/useResponsive";
import styles from "./App.module.scss";

const ProductList = React.lazy(
  () => import("./components/Lists/ProductList/ProductList")
);
const CartScreen = React.lazy(
  () => import("./components/Lists/CartList/CartList")
);

function App() {
  const isMobile = useResponsive();

  return (
    <Router>
      <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
        <Routes>
          {isMobile ? (
            <>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<CartScreen />} />
            </>
          ) : (
            <Route
              path="/"
              element={
                <div className={styles.desktopLayout}>
                  <div className={styles.productList}>
                    <ProductList />
                  </div>
                  <div className={styles.cartScreen}>
                    <CartScreen />
                  </div>
                </div>
              }
            />
          )}

          <Route
            path={"*"}
            element={
              <div className={styles.error404}>
                <h1>Not found</h1>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
