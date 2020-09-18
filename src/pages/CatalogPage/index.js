import React from "react";
import PropTypes from "prop-types";

import Products from "../../containers/Products/index";

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
    openModal,
    origins,
}) => {
    return (
        <Products
            editable={""}
            title="Каталог"
            button="Добавить в корзину"
            openModal={openModal}
            origins={origins}
            products={products}
            getProducts={getProducts}
            summaryPrice={summaryPrice}
            addToCart={addToCart}
            setOrigins={setOrigins}
            options={options}
            queryOptions={queryOptions}
            setPerPage={setPerPage}
            changePriceRange={changePriceRange}
        />
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
    openModal: PropTypes.func,
    origins: PropTypes.array,
};
export default CatalogPage;
