import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../assets/css/header.module.css";

const Header = (props) => {
    return (
        <div className={styles.header}>
            <div className={styles.nav_wrap}>
                <Link to="/">Каталог</Link>
            </div>
            {!props.hide && (
                <div className={styles.cart_wrap}>
                    <Link to="/cart">
                        Корзина
                        <br />
                        {props.summaryPrice}
                    </Link>
                </div>
            )}
        </div>
    );
};
Header.defaultProps = {
    summaryPrice: 0,
};
Header.propTypes = {
    summaryPrice: PropTypes.number,
};
export default Header;
