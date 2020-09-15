import React from "react";
import Header from "../components/Header";
import styles from "../assets/css/cartPage.module.css";
import CartTable from "../components/CartTable";
import PropTypes from "prop-types";

const CartPage = ({
    products,
    productsCount,
    summaryPrice,
    removeProduct,
    changeProductCount,
    increseProductCount,
    decreseProductCount,
}) => {
    return (
        <div>
            <Header hide={true} />
            <div className={styles.cart_page}>
                {products.length > 0 ? (
                    <>
                        <h1 className={styles.cart_title}>Корзина</h1>
                        <CartTable
                            products={products}
                            productsCount={productsCount}
                            summaryPrice={summaryPrice}
                            removeProduct={removeProduct}
                            changeProductCount={changeProductCount}
                            increseProductCount={increseProductCount}
                            decreseProductCount={decreseProductCount}
                        />
                    </>
                ) : (
                    <div>
                        <h1 className={styles.cart_title}>Корзина пуста</h1>
                    </div>
                )}
            </div>
        </div>
    );
};
CartPage.propTypes = {
    products: PropTypes.array,
    productsCount: PropTypes.number,
    summaryPrice: PropTypes.number,
    removeProduct: PropTypes.func,
    changeProductCount: PropTypes.func,
    increseProductCount: PropTypes.func,
    decreseProductCount: PropTypes.func,
};

export default CartPage;
