import React, { useEffect, useState } from "react";
import api from "../../services/api";
import PropTypes from "prop-types";

import Header from "../../components/Header/index";

import defaultImg from "../../assets/img/productImage.gif";
import loader from "../../assets/img/loader.gif";
import styles from "./styles.module.css";

const ProductPage = ({ summaryPrice, addToCart, match, openModal }) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        api.get(`/products/${match.params.id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                throw new Error("Error with API");
            });
    }, [match.params.id]);
    return product.id ? (
        <div>
            <Header openModal={openModal} summaryPrice={summaryPrice} />
            <div className={styles.product_page}>
                <div className={styles.image_wrap}>
                    <img src={defaultImg} alt="" />
                </div>
                <div className={styles.product_info}>
                    <h1 className={styles.product_title}>{product.name}</h1>
                    <p className={styles.info}>
                        Origin: <span>{product.origin}</span>
                    </p>
                    <p className={styles.price}>{product.price}</p>
                    <button
                        data-productid={product.id}
                        data-productprice={product.price}
                        data-productname={product.name}
                        onClick={addToCart}
                        className={styles.add_to_cart}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.loader}>
            <img src={loader} alt="" />
        </div>
    );
};

ProductPage.propTypes = {
    summaryPrice: PropTypes.number,
    addToCart: PropTypes.func,
    match: PropTypes.object,
    openModal: PropTypes.func,
};

export default ProductPage;
