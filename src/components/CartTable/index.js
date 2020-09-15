import React from "react";
import PropTypes from "prop-types";

import styles from "./styles.module.css";
import xmark from "../../assets/img/xmark.png";

const CartTable = ({
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
            <table className={styles.cart_table}>
                <thead>
                    <tr>
                        <td>Название товара</td>
                        <td>Количество</td>
                        <td>Цена</td>
                        <td>Общая цена</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {products.map((el) => {
                        return (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>
                                    <button
                                        className={styles.change_count}
                                        onClick={decreseProductCount}
                                        data-id={el.id}
                                    >
                                        -
                                    </button>
                                    <input
                                        className={styles.count_input}
                                        onChange={changeProductCount}
                                        data-id={el.id}
                                        value={el.count}
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            return false;
                                        }}
                                    />
                                    <button
                                        className={styles.change_count}
                                        onClick={increseProductCount}
                                        data-id={el.id}
                                    >
                                        +
                                    </button>
                                </td>
                                <td>{el.price}</td>
                                <td className={styles.price}>
                                    {el.summaryPrice}
                                </td>
                                <td className={styles.xmark}>
                                    <img
                                        alt=""
                                        onClick={removeProduct}
                                        data-productid={el.id}
                                        src={xmark}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                    <tr className={styles.summaryPrice}>
                        <td className={styles.summary_count_title} colSpan="3">
                            Количество товаров
                        </td>
                        <td className={styles.summary_count}>
                            {productsCount}
                        </td>
                    </tr>
                    <tr className={styles.summaryPrice}>
                        <td className={styles.summary_price_title} colSpan="3">
                            Общая стоимость
                        </td>
                        <td className={styles.summary_price}>{summaryPrice}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

CartTable.propTypes = {
    products: PropTypes.array,
    productsCount: PropTypes.number,
    summaryPrice: PropTypes.number,
    removeProduct: PropTypes.func,
    decreseProductCount: PropTypes.func,
    increseProductCount: PropTypes.func,
    changeProductCount: PropTypes.func,
};
export default CartTable;
