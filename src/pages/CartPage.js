import React from "react";
import Header from "../components/Header";
import styles from "../assets/css/cartPage.module.css";
import CartTable from "../components/CartTable";
import PropTypes from "prop-types";

const CartPage = (props) => {
    return (
        <div>
            <Header hide={true} />
            <div className={styles.cart_page}>
                {props.products.length > 0 ? (
                    <CartTable
                        products={props.products}
                        productsCount={props.productsCount}
                        summaryPrice={props.summaryPrice}
                        removeProduct={props.removeProduct}
                        changeProductCount={props.changeProductCount}
                        increseProductCount={props.increseProductCount}
                        decreseProductCount={props.decreseProductCount}
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
    changeProductCount: PropTypes.func,
    increseProductCount: PropTypes.func,
    decreseProductCount: PropTypes.func,
};

export default CartPage;
