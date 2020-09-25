import React from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header/index";
import CartTable from "../../components/CartTable/index";

import styles from "./styles.module.css";

const CartPage = ({
    products,
    openModal,
    productsCount,
    summaryPrice,
    removeProduct,
    changeProductCount,
    increseProductCount,
    decreseProductCount,
    createNewOrder,
}) => {
    const createOrder = () => {
        const order = products.map((el) => {
            return { productId: el.id, count: el.count };
        });
        createNewOrder(order);
    };

    return (
        <div>
            <Header hide={true} openModal={openModal} />
            <div className={styles.cart_page}>
                {products.length > 0 ? (
                    <div>
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
                        <button
                            className={styles.create_order}
                            onClick={createOrder}
                        >
                            Оформить заказ
                        </button>
                    </div>
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
    openModal: PropTypes.func,
    createNewOrder: PropTypes.func,
};

export default CartPage;
