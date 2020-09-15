import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../assets/css/header.module.css";

const Header = ({ summaryPrice, hide }) => {
    return (
        <div className={styles.header}>
            <div className={styles.nav_wrap}>
                <Link className={styles.nav_link} to="/">
                    Каталог
                </Link>
            </div>
            {!hide && (
                <div className={styles.cart_wrap}>
                    <Link className={styles.nav_link} to="/cart">
                        Корзина
                        <br />
                        {summaryPrice}
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
