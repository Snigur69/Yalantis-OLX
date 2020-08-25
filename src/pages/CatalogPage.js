import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../assets/css/catalogPage.module.css";
import Product from "../components/Product";
import Header from "../components/Header";
import PropTypes from "prop-types";

const CatalogPage = (props) => {
    const [products, setProducts] = useState(null);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getPage = (event) => {
        setCurrentPage(+event.target.innerText);
        api.get(`/products?page=${+event.target.innerText}`)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                throw new Error("Error with Users API");
            });
    };

    useEffect(() => {
        api.get(`/products?page=${currentPage}`)
            .then((response) => {
                setProducts(response.data);
                setPagesCount(
                    Math.ceil(response.data.totalItems / response.data.perPage)
                );
            })
            .catch((error) => {
                throw new Error("Error with Users API");
            });
    }, []);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return products ? (
        <div className={styles.catalog}>
            <Header summaryPrice={props.summaryPrice} />
            <h1>Каталог</h1>
            <div className={styles.products_wrap}>
                {products.items.map((el) => {
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
    ) : null;
};

CatalogPage.propTypes = {
    summaryPrice: PropTypes.number,
    addToCart: PropTypes.func,
};

export default CatalogPage;
