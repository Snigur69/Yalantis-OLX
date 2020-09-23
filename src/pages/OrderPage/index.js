import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import { API_TOKEN } from "../../constants/constants";

import Header from "../../components/Header/index";
import Order from "../../components/Order";

import styles from "./styles.module.css";

const OrderPage = ({
    openModal,
    summaryPrice,
    match,
    order,
    currentOrderRequest,
}) => {
    // const [order, setOrder] = useState({});

    useEffect(() => {
        const url = `/orders/${match.params.id}`;
        currentOrderRequest(url);
        // api({
        //     method: "get",
        //     url: `/orders/${match.params.id}`,
        //     headers: {
        //         "Content-Type": " application/json",
        //         Authorization: API_TOKEN,
        //     },
        // })
        //     .then((response) => {
        //         setOrder(response.data);
        //     })
        //     .catch((error) => {
        //         throw new Error(error);
        //     });
    }, [match.params.id]);
    return (
        <div className={styles.order}>
            <Header openModal={openModal} summaryPrice={summaryPrice} />
            <h1 className={styles.title}>Ваш заказ:</h1>
            <Order order={order} />
        </div>
    );
};
OrderPage.defaultProps = {
    summaryPrice: 0,
};
OrderPage.propTypes = {
    summaryPrice: PropTypes.number,
    openModal: PropTypes.func,
    match: PropTypes.object,
};

export default OrderPage;
