import React, { useState, useEffect } from "react";
import api from "../services/api";
import styles from "../assets/css/catalogPage.module.css";
import Product from "../components/Product";
import Header from "../components/Header";
import PropTypes from "prop-types";
import loader from "../assets/img/loader.gif";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";

const CatalogPage = ({
    summaryPrice,
    addToCart,
    products,
    getProducts,
    setOrigins,
    options,
    queryOptions,
    setPerPage,
    changePriceRange,
}) => {
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
        setOrigins(e.target.name, e.target.checked);
    };

    const changeMinPrice = (e) => {
        setminValue(e.target.value.replace(/\D/, ""));
    };
    const changeMaxPrice = (e) => {
        setmaxValue(e.target.value.replace(/\D/, ""));
    };

    const handleChangePriceRange = () => {
        changePriceRange(Number(minValue), Number(maxValue));
    };

    const perPageChange = (e) => {
        setCurrentPage(1);
        setPerPage(e.target.value);
    };

    useEffect(() => {
        api.get(`/products?${queryOptions}&page=${currentPage}`)
            .then((response) => {
                getProducts(response.data.items);
                setPagesCount(
                    Math.ceil(response.data.totalItems / response.data.perPage)
                );
            })
            .catch((error) => {
                throw new Error("Error with API");
            });

        api.get(`/products-origins`)
            .then((response) => {
                let originId = 0;
                const newOrigins = response.data.items.map((el) => {
                    if (options.origins.includes(el.value)) {
                        return {
                            ...el,
                            id: originId++,
                            isChecked: true,
                        };
                    }
                    return {
                        ...el,
                        id: originId++,
                        isChecked: false,
                    };
                });
                setNewOrigins(newOrigins);
            })
            .catch((error) => {
                throw new Error("Error with API");
            });
        setminValue(options.minPrice);
        setmaxValue(options.maxPrice);
    }, [options, currentPage, getProducts, queryOptions]);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.catalog}>
            <Header summaryPrice={summaryPrice} />
            <h1 className={styles.catalog_title}>Каталог</h1>
            <div className={styles.catalog_wrap}>
                <Filter
                    getProductsByOrigin={getProductsByOrigin}
                    changeMinPrice={changeMinPrice}
                    changeMaxPrice={changeMaxPrice}
                    changePriceRange={handleChangePriceRange}
                    perPageChange={perPageChange}
                    minValue={minValue}
                    maxValue={maxValue}
                    origins={origins}
                    options={options}
                />
                {products.length ? (
                    <div className={styles.products_wrap}>
                        {products.map((el) => {
                            return (
                                <Product
                                    addToCart={addToCart}
                                    key={el.id}
                                    product={el}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.loader}>
                        <img src={loader} alt="" />
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
