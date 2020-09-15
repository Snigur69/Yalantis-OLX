import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Header = ({ summaryPrice, hide, openModal }) => {
    return (
        <div className={styles.header}>
            <div className={styles.nav_wrap}>
                <Link className={styles.nav_link} to="/">
                    Каталог
                </Link>
            </div>
            <div>
                <Link className={styles.nav_link} to="/my-products">
                    Мои продукты
                </Link>
            </div>
            <div>
                <Link className={styles.nav_link} to="/history">
                    История заказов
                </Link>
            </div>
            <div>
                <button className={styles.open_modal} onClick={openModal}>
                    Добавить продукт
                </button>
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
    openModal: PropTypes.func,
    hide: PropTypes.bool,
};
export default Header;
