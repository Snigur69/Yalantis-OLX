import React, { useEffect } from "react";
import PropTypes from "prop-types";

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
    useEffect(() => {
        const url = `/orders/${match.params.id}`;
        currentOrderRequest(url);
    }, [match.params.id, currentOrderRequest]);
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
    order: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.string,
        pieces: PropTypes.array,
    }),
    currentOrderRequest: PropTypes.func,
};

export default OrderPage;
