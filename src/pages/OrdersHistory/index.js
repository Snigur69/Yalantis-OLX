import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../services/api";
import { API_TOKEN } from "../../constants/constants";

import Header from "../../components/Header/index";
import styles from "./styles.module.css";

const OrdersHistory = ({ openModal, summaryPrice, orders, ordersRequest }) => {
    // const [orders, setOrders] = useState([]);

    useEffect(() => {
        ordersRequest();
        // api({
        //     method: "get",
        //     url: "/orders",
        //     headers: {
        //         "Content-Type": " application/json",
        //         Authorization: API_TOKEN,
        //     },
        // })
        //     .then((response) => {
        //         setOrders(response.data.items);
        //     })
        //     .catch((error) => {
        //         throw new Error(error);
        //     });
    }, []);

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
};

export default OrdersHistory;
