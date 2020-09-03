import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../assets/css/catalogPage.module.css";
import Product from "../components/Product";
import Header from "../components/Header";
import PropTypes from "prop-types";
import loader from "../assets/img/loader.gif";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const CatalogPage = (props) => {
    const [origins, setNewOrigins] = useState([]);
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(0);
    const [pagesCount, setPagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const getPage = (event) => {
        setCurrentPage(+event.target.innerText);
    };

    const getProductsByOrigin = (e) => {
        setCurrentPage(1);
        props.setOrigins(e.target.name, e.target.checked);
    };

    const changeMinPrice = (e) => {
        if (!isNaN(e.target.value)) {
            setminValue(e.target.value.replace(/\D/, ""));
        }
    };
    const changeMaxPrice = (e) => {
        if (!isNaN(e.target.value)) {
            setmaxValue(e.target.value.replace(/\D/, ""));
        }
    };

    const changePriceRange = () => {
        props.changePriceRange(+minValue, +maxValue);
    };

    const perPageChange = (e) => {
        setCurrentPage(1);
        props.setPerPage(e.target.value);
    };

    useEffect(() => {
        api.get(`/products?${props.queryOptions}&page=${currentPage}`)
            .then((response) => {
                props.getProducts(response.data.items);
                setPagesCount(
                    Math.ceil(response.data.totalItems / response.data.perPage)
                );
            })
            .catch((error) => {
                throw new Error("Error with API");
            });

        api.get(`/products-origins`)
            .then((response) => {
                let newOrigins = response.data.items.map((el) => {
                    if (props.options.origins.includes(el.value)) {
                        return {
                            ...el,
                            isChecked: true,
                        };
                    }
                    return {
                        ...el,
                        isChecked: false,
                    };
                });
                setNewOrigins(newOrigins);
            })
            .catch((error) => {
                throw new Error("Error with API");
            });

        setminValue(props.options.minPrice);
        setmaxValue(props.options.maxPrice);
    }, [props.options, currentPage]);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.catalog}>
            <Header summaryPrice={props.summaryPrice} />
            <h1>Каталог</h1>
            <div className={styles.catalog_wrap}>
                <Filter
                    getProductsByOrigin={getProductsByOrigin}
                    changeMinPrice={changeMinPrice}
                    changeMaxPrice={changeMaxPrice}
                    changePriceRange={changePriceRange}
                    perPageChange={perPageChange}
                    minValue={minValue}
                    maxValue={maxValue}
                    origins={origins}
                    options={props.options}
                />
                {props.products.length ? (
                    <div className={styles.products_wrap}>
                        {props.products.map((el) => {
                            return (
                                <Product
                                    addToCart={props.addToCart}
                                    key={el.id}
                                    product={el}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.loader}>
                        <img src={loader} />
                    </div>
                )}
            </div>
            {pages.length > 1 && (
                <Pagination
                    pages={pages}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    getPage={getPage}
                />
            )}
        </div>
    );
};

CatalogPage.propTypes = {
    summaryPrice: PropTypes.number,
    addToCart: PropTypes.func,
    products: PropTypes.array,
    getProducts: PropTypes.func,
    setOrigins: PropTypes.func,
    options: PropTypes.shape({
        perPage: PropTypes.number,
        origins: PropTypes.array,
        minPrice: PropTypes.number,
        maxPrice: PropTypes.number,
    }),
    queryOptions: PropTypes.string,
    setPerPage: PropTypes.func,
    changePriceRange: PropTypes.func,
};

export default CatalogPage;
