import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { convertUrlToParams } from "../../helpers/helpers";

import Product from "../../components/Product/index";
import Header from "../../components/Header/index";
import Filter from "../../components/Filter/index";
import Pagination from "../../components/Pagination/index";

import loader from "../../assets/img/loader.gif";
import styles from "./styles.module.css";

const Products = ({
    summaryPrice,
    addToCart,
    products,
    getProducts,
    setOrigins,
    options,
    queryOptions,
    setPerPage,
    changePriceRange,
    openModal,
    origins,
    button,
    token,
    title,
    editable,
    setCurrentPage,
    productsCount,
    productsRequest,
}) => {
    const [newOrigins, setNewOrigins] = useState([]);
    const [minValue, setminValue] = useState(0);
    const [maxValue, setmaxValue] = useState(10000);
    const [pagesCount, setPagesCount] = useState(0);
    const history = useHistory();

    const getPage = (event) => {
        setCurrentPage(Number(event.target.innerText));
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
    let requestOptions = {};

    useEffect(() => {
        if (history.action === "PUSH") {
            history.push({
                pathname: history.location.pathname,
                search: `?`,
            });
        }
        requestOptions = convertUrlToParams(
            history.location.search.replace("?", "")
        );
        requestOptions.perPage
            ? setPerPage(requestOptions.perPage)
            : setPerPage(50);
        if (requestOptions.origins) {
            const originsArray = requestOptions.origins.split(",");
            for (let i = 0; i < originsArray.length; i++) {
                setOrigins(originsArray[i], true);
            }
        } else {
            for (let i = 0; i < origins.length; i++) {
                setOrigins("", false);
            }
        }
        changePriceRange(
            Number(requestOptions.minPrice),
            Number(requestOptions.maxPrice)
        );
        requestOptions.page
            ? setCurrentPage(Number(requestOptions.page))
            : setCurrentPage(1);
    }, []);

    useEffect(() => {
        const url = editable
            ? `/products?${queryOptions}&editable=true`
            : `/products?${queryOptions}`;
        history.push({
            pathname: history.location.pathname,
            search: `?${queryOptions}`,
        });

        const headers = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = token;
        }
        productsRequest({ url, headers });
        setPagesCount(Math.ceil(productsCount / options.perPage));

        let originId = 0;
        const newOrigins = origins.map((el) => {
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
        if (options.minPrice) {
            setminValue(options.minPrice);
        }
        if (options.maxPrice) {
            setmaxValue(options.maxPrice);
        }
    }, [
        options,
        getProducts,
        queryOptions,
        origins,
        token,
        editable,
        history,
        productsCount,
        productsRequest,
    ]);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={styles.catalog}>
            <Header openModal={openModal} summaryPrice={summaryPrice} />
            <h1 className={styles.catalog_title}>{title}</h1>
            <div className={styles.catalog_wrap}>
                <Filter
                    getProductsByOrigin={getProductsByOrigin}
                    changeMinPrice={changeMinPrice}
                    changeMaxPrice={changeMaxPrice}
                    changePriceRange={handleChangePriceRange}
                    perPageChange={perPageChange}
                    minValue={minValue}
                    maxValue={maxValue}
                    origins={newOrigins}
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
                                    button={button}
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
                    currentPage={options.currentPage}
                    getPage={getPage}
                />
            )}
        </div>
    );
};

Products.propTypes = {
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
        currentPage: PropTypes.number,
    }),
    queryOptions: PropTypes.string,
    setPerPage: PropTypes.func,
    changePriceRange: PropTypes.func,
    openModal: PropTypes.func,
    origins: PropTypes.array,
    button: PropTypes.string,
    token: PropTypes.string,
    title: PropTypes.string,
    editable: PropTypes.string,
    setCurrentPage: PropTypes.func,
    productsCount: PropTypes.number,
    productsRequest: PropTypes.func,
};

export default Products;
