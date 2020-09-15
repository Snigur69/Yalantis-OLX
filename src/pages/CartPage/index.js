import React from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import { token } from "../../constants/constants";
import { useHistory } from "react-router-dom";

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
    clearCart,
}) => {
    const history = useHistory();

    const createOrder = () => {
        let order = products.map((el) => {
            return { productId: el.id, count: el.count };
        });
        api({
            method: "post",
            url: "/orders",
            headers: {
                "Content-Type": " application/json",
                Authorization: token,
            },
            data: JSON.stringify({
                order: {
                    pieces: order,
                },
            }),
        })
            .then((response) => {
                history.push(`/orders/${response.data.id}`);
                clearCart();
            })
            .catch((error) => {
                throw new Error(error);
            });
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
    clearCart: PropTypes.func,
    openModal: PropTypes.func,
};

export default CartPage;
