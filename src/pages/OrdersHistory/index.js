import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Header from "../../components/Header/index";
import styles from "./styles.module.css";

const OrdersHistory = ({ openModal, summaryPrice, orders, ordersRequest }) => {
    useEffect(() => {
        ordersRequest();
    }, [ordersRequest]);

    return (
        <div className={styles.history}>
            <Header openModal={openModal} summaryPrice={summaryPrice} />
            <h1 className={styles.title}>История заказов</h1>
            <div className={styles.order_list}>
                {orders.map((el, index) => {
                    return (
                        <Link key={index} to={`/orders/${el.id}`}>
                            Заказ №{index + 1}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

OrdersHistory.propTypes = {
    summaryPrice: PropTypes.number,
    openModal: PropTypes.func,
    order: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.string,
        pieces: PropTypes.array,
    }),
    ordersRequest: PropTypes.func,
};

export default OrdersHistory;
