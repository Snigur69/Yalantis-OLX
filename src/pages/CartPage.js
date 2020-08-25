import React from "react";
import Header from "../components/Header";
import styles from "../assets/css/cartPage.module.css";
import CartTable from "../components/CartTable";
import PropTypes from "prop-types";

const CartPage = (props) => {
    return (
        <div>
            <Header />
            <div className={styles.cart_page}>
                {props.products.length > 0 ? (
                    <CartTable
                        products={props.products}
                        productsCount={props.productsCount}
                        summaryPrice={props.summaryPrice}
                        removeProduct={props.removeProduct}
                    />
                ) : (
                    <div>
                        <h1>Корзина пуста</h1>
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
};

export default CartPage;
