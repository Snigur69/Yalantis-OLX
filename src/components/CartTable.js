import React from "react";
import PropTypes from "prop-types";
import xmark from "../assets/img/xmark.png";
import styles from "../assets/css/carttable.module.css";

const CartTable = (props) => {
    return (
        <div>
            <h1>Корзина</h1>
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
                    {props.products.map((el) => {
                        return (
                            <tr key={el.id}>
                                <td>{el.name}</td>
                                <td>{el.count}</td>
                                <td>{el.price}</td>
                                <td className={styles.price}>
                                    {el.summaryPrice}
                                </td>
                                <td className={styles.xmark}>
                                    <img
                                        onClick={props.removeProduct}
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
                            {props.productsCount}
                        </td>
                    </tr>
                    <tr className={styles.summaryPrice}>
                        <td className={styles.summary_price_title} colSpan="3">
                            Общая стоимость
                        </td>
                        <td className={styles.summary_price}>
                            {props.summaryPrice}
                        </td>
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
};
export default CartTable;
