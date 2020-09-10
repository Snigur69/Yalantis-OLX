import React from "react";
import { Link } from "react-router-dom";
import styles from "../assets/css/product.module.css";
import defaultImg from "../assets/img/defaultImg.jpg";
import PropTypes from "prop-types";

const Product = ({ addToCart, product }) => {
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
                onClick={addToCart}
                className={styles.add_to_cart}
            >
                Добавить в корзину
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
};

export default Product;
