import React from "react";
import PropTypes from "prop-types";

import loader from "../../assets/img/loader.gif";
import styles from "./styles.module.css";

const Order = ({ order }) => {
    let summary = 0;
    return order.pieces ? (
        <div>
            <table className={styles.order_table}>
                <thead>
                    <tr>
                        <td>Название</td>
                        <td>Количество</td>
                        <td>Цена за единицу товара</td>
                        <td>Общая цена</td>
                    </tr>
                </thead>
                <tbody>
                    {order.pieces.map((el, index) => {
                        summary += el.product.price * el.count;
                        return (
                            <tr key={el.id}>
                                <td>{el.product.name}</td>
                                <td>{el.count}</td>
                                <td>{el.product.price}</td>
                                <td>{el.product.price * el.count}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan="4">
                            Общая сумма заказа:{" "}
                            <span className={styles.summary_price}>
                                {summary}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ) : (
        <div>
            <img alt="" src={loader} />
        </div>
    );
};

Order.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.string,
        count: PropTypes.number,
        product: PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.number,
        }),
    }),
};

export default Order;
