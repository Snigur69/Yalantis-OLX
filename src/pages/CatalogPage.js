import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../assets/css/catalogPage.module.css";
import Product from "../components/Product";
import Header from "../components/Header";
import PropTypes from "prop-types";
import loader from "../assets/img/loader.gif";

const CatalogPage = (props) => {
    const [products, setProducts] = useState([]);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getPage = (event) => {
        setCurrentPage(+event.target.innerText);
        api.get(`/products?page=${+event.target.innerText}`)
            .then((response) => {
                setProducts(response.data.items);
            })
            .catch((error) => {
                throw new Error("Error with API");
            });
    };

    useEffect(() => {
        api.get(`/products?page=${currentPage}`)
            .then((response) => {
                setProducts(response.data.items);
                setPagesCount(
                    Math.ceil(response.data.totalItems / response.data.perPage)
                );
            })
            .catch((error) => {
                throw new Error("Error with API");
            });
    }, []);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return products.length ? (
        <div className={styles.catalog}>
            <Header summaryPrice={props.summaryPrice} />
            <h1>Каталог</h1>
            <div className={styles.products_wrap}>
                {products.map((el) => {
                    return (
                        <Product
                            addToCart={props.addToCart}
                            key={el.id}
                            product={el}
                        />
                    );
                })}
            </div>
            <div className={styles.pagination}>
                {pages.map((el) => {
                    if (el == currentPage) {
                        return (
                            <a
                                className={styles.current_page}
                                onClick={getPage}
                                key={el}
                                value={el}
                            >
                                {el}
                            </a>
                        );
                    } else {
                        return (
                            <a onClick={getPage} key={el} value={el}>
                                {el}
                            </a>
                        );
                    }
                })}
            </div>
            <br />
        </div>
    ) : (
        <div className={styles.loader}>
            <img src={loader} />
        </div>
    );
};

CatalogPage.propTypes = {
    summaryPrice: PropTypes.number,
    addToCart: PropTypes.func,
};

export default CatalogPage;
