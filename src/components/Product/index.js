import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import defaultImg from "../../assets/img/defaultImg.jpg";
import styles from "./styles.module.css";

const Product = ({ addToCart, product, button }) => {
    return (
        <div className={styles.single_product}>
            <Link to={`/product/${product.id}`}>
                <img src={defaultImg} alt="" />
                <p className={styles.title}>{product.name}</p>
            </Link>
            <p className={styles.price}>{product.price}</p>
            <button
                data-productid={product.id}
                data-productprice={product.price}
                data-productname={product.name}
                data-origin={product.origin}
                onClick={addToCart}
                className={styles.add_to_cart}
            >
                {button}
            </button>
        </div>
    );
};

Product.propTypes = {
    addToCart: PropTypes.func,
    product: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
    }),
    button: PropTypes.string,
};

export default Product;
