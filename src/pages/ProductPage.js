import React, { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import styles from "../assets/css/productPage.module.css";
import defaultImg from "../assets/img/productImage.gif";
import PropTypes from "prop-types";
import loader from "../assets/img/loader.gif";

const ProductPage = (props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        api.get(`/products/${props.match.params.id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                throw new Error("Error with API");
            });
    }, []);
    return product.id ? (
        <div>
            <Header summaryPrice={props.summaryPrice} />
            <div className={styles.product_page}>
                <div className={styles.image_wrap}>
                    <img src={defaultImg} />
                </div>
                <div className={styles.product_info}>
                    <h1>{product.name}</h1>
                    <p className={styles.info}>
                        Origin: <span>{product.origin}</span>
                    </p>
                    <p className={styles.price}>{product.price}</p>
                    <button
                        data-productid={product.id}
                        data-productprice={product.price}
                        data-productname={product.name}
                        onClick={props.addToCart}
                        className={styles.add_to_cart}
                    >
                        Добавить в корзину
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className={styles.loader}>
            <img src={loader} />
        </div>
    );
};

ProductPage.propTypes = {
    summaryPrice: PropTypes.number,
    addToCart: PropTypes.func,
};

export default ProductPage;
