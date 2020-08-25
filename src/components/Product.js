import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styles from "../assets/css/product.module.css";
import defaultImg from "../assets/img/defaultImg.jpg";
import PropTypes from "prop-types";

const Product = (props) => {
    return (
        <div className={styles.single_product}>
            <Link to={`/product/${props.product.id}`}>
                <img src={defaultImg} />
                <p className={styles.title}>{props.product.name}</p>
            </Link>
            <p className={styles.price}>{props.product.price}</p>
            <button
                data-productid={props.product.id}
                data-productprice={props.product.price}
                data-productname={props.product.name}
                onClick={props.addToCart}
                className={styles.add_to_cart}
            >
                Добавить в корзину
            </button>
        </div>
    );
};

Product.propTypes = {
    addToCart: PropTypes.func,
    product: PropTypes.object,
};

export default Product;
