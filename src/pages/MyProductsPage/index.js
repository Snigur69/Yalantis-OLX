import React, { useState } from "react";
import PropTypes from "prop-types";
import { API_TOKEN } from "../../constants/constants";

import Products from "../../containers/Products/index";

const MyProductsPage = ({
    products,
    summaryPrice,
    setOrigins,
    getProducts,
    options,
    queryOptions,
    setPerPage,
    changePriceRange,
    openModal,
    origins,
    editProductModal,
    setCurrentPage,
    setTotalCount,
    productsCount,
    productsRequest,
}) => {
    // const [products, setProducts] = useState([]);

    return (
        <Products
            editable={"editable=true"}
            title="Мои товары"
            token={API_TOKEN}
            button="Редактировать"
            openModal={openModal}
            origins={origins}
            products={products}
            getProducts={getProducts}
            summaryPrice={summaryPrice}
            addToCart={editProductModal}
            setOrigins={setOrigins}
            options={options}
            queryOptions={queryOptions}
            setPerPage={setPerPage}
            changePriceRange={changePriceRange}
            setCurrentPage={setCurrentPage}
            setTotalCount={setTotalCount}
            productsCount={productsCount}
            productsRequest={productsRequest}
        />
    );
};

MyProductsPage.propTypes = {
    summaryPrice: PropTypes.number,
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
    openModal: PropTypes.func,
    origins: PropTypes.array,
    editProductModal: PropTypes.func,
};

export default MyProductsPage;
