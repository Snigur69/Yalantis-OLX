import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { PATHS } from "./constants/constants";

import CartPage from "./pages/CartPage/index";
import ProductPage from "./pages/ProductPage/index";
import CatalogPage from "./pages/CatalogPage/index";
import MyProductsPage from "./pages/MyProductsPage/index";
import CreateProduct from "./containers/CreateProduct";
import EditProduct from "./containers/EditProduct";
import OrdersHistory from "./pages/OrdersHistory";
import OrderPage from "./pages/OrderPage";

import "./App.css";

import {
    getProducts,
    addProductToCart,
    removeProductFromCart,
    changeProductCount,
    increseProductCount,
    decreseProductCount,
    setOrigins,
    setPerPage,
    changePriceRange,
    openModal,
    closeModal,
    clearCart,
    setCurrentPage,
    originsRequest,
    setTotalCount,
    productsRequest,
    currentProductRequest,
    ordersRequest,
    currentOrderRequest,
    createOrder,
    addNewProduct,
    editProduct,
} from "./store/actions";
import {
    cartItemsSelector,
    cartTotalSelector,
    queryOptionsSelector,
    cartProductsSelector,
    productsSelector,
    optionsSelector,
    modalStateSelector,
    currentProductSelector,
    globalOriginsSelector,
    productsCountSelector,
    globalCurrentProductSelector,
    ordersSelector,
    currentOrderSelector,
    submitErrorSelector,
} from "./selectors/selectors";

const App = ({
    products,
    cart,
    options,
    cartItems,
    cartTotal,
    queryOptions,
    getProductsDispatch,
    addProductToCartDispatch,
    removeProductFromCartDispatch,
    changeProductCountDispatch,
    increseProductCountDispatch,
    decreseProductCountDispacth,
    setOriginsDispatch,
    setPerPageDispatch,
    changePriceRangeDispatch,
    openModalDispatch,
    closeModalDispatch,
    modal,
    currentProduct,
    origins,
    clearCartDispatch,
    setCurrentPage,
    originsRequest,
    setTotalCount,
    productsCount,
    productsRequest,
    currentProductRequest,
    globalCurrentProduct,
    orders,
    ordersRequest,
    currentOrder,
    currentOrderRequest,
    createOrder,
    addNewProduct,
    isSubmitError,
    editProduct,
}) => {
    useEffect(() => {
        originsRequest();
    }, []);

    const addToCart = (e) => {
        const newProduct = {
            id: e.target.dataset.productid,
            name: e.target.dataset.productname,
            count: 1,
            price: Number(e.target.dataset.productprice),
            summaryPrice: Number(e.target.dataset.productprice),
        };
        addProductToCartDispatch(newProduct);
    };

    const removeProduct = (e) => {
        let removedIndex;
        for (let i = 0; i < cart.length; i++) {
            if (e.target.dataset.productid === cart[i].id) {
                removedIndex = i;
            }
        }
        removeProductFromCartDispatch(removedIndex);
    };

    const handleChangeProductCount = (e) => {
        changeProductCountDispatch(
            e.target.dataset.id,
            e.target.value.replace(/\D/, "")
        );
    };
    const handleIncreseProductCount = (e) => {
        increseProductCountDispatch(e.target.dataset.id);
    };
    const handleDecreseProductCount = (e) => {
        decreseProductCountDispacth(e.target.dataset.id);
    };
    const editProductModal = (e) => {
        openModalDispatch({
            id: e.target.dataset.productid,
            name: e.target.dataset.productname,
            price: Number(e.target.dataset.productprice),
            origin: e.target.dataset.origin,
        });
    };
    const handleOpenModal = () => {
        openModalDispatch();
    };

    return (
        <div className="store">
            <Router>
                <Switch>
                    <Route path={PATHS.CART}>
                        <CartPage
                            clearCart={clearCartDispatch}
                            openModal={handleOpenModal}
                            products={cart}
                            productsCount={cartItems}
                            summaryPrice={cartTotal}
                            removeProduct={removeProduct}
                            changeProductCount={handleChangeProductCount}
                            increseProductCount={handleIncreseProductCount}
                            decreseProductCount={handleDecreseProductCount}
                            createNewOrder={createOrder}
                        />
                    </Route>
                    <Route
                        path={PATHS.PRODUCT}
                        render={(innerProps) => (
                            <ProductPage
                                {...innerProps}
                                addToCart={addToCart}
                                openModal={handleOpenModal}
                                summaryPrice={cartTotal}
                                currentProductRequest={currentProductRequest}
                                product={globalCurrentProduct}
                            />
                        )}
                    />
                    <Route
                        path={PATHS.ORDER}
                        render={(innerProps) => (
                            <OrderPage
                                {...innerProps}
                                openModal={handleOpenModal}
                                summaryPrice={cartTotal}
                                order={currentOrder}
                                currentOrderRequest={currentOrderRequest}
                            />
                        )}
                    />
                    <Route path={PATHS.MY_PRODUCTS}>
                        <MyProductsPage
                            editProductModal={editProductModal}
                            products={products}
                            getProducts={getProductsDispatch}
                            openModal={handleOpenModal}
                            summaryPrice={cartTotal}
                            setOrigins={setOriginsDispatch}
                            options={options}
                            queryOptions={queryOptions}
                            setPerPage={setPerPageDispatch}
                            changePriceRange={changePriceRangeDispatch}
                            origins={origins}
                            setCurrentPage={setCurrentPage}
                            productsCount={productsCount}
                            setTotalCount={setTotalCount}
                            productsRequest={productsRequest}
                        />
                    </Route>

                    <Route path={PATHS.ORDERS_HISTORY}>
                        <OrdersHistory
                            openModal={handleOpenModal}
                            summaryPrice={cartTotal}
                            orders={orders}
                            ordersRequest={ordersRequest}
                        />
                    </Route>

                    <Route path="/">
                        <CatalogPage
                            openModal={handleOpenModal}
                            origins={origins}
                            products={products}
                            getProducts={getProductsDispatch}
                            summaryPrice={cartTotal}
                            addToCart={addToCart}
                            setOrigins={setOriginsDispatch}
                            options={options}
                            queryOptions={queryOptions}
                            setPerPage={setPerPageDispatch}
                            changePriceRange={changePriceRangeDispatch}
                            setCurrentPage={setCurrentPage}
                            productsCount={productsCount}
                            setTotalCount={setTotalCount}
                            productsRequest={productsRequest}
                        />
                    </Route>
                </Switch>

                {modal &&
                    (currentProduct.id ? (
                        <EditProduct
                            currentProduct={currentProduct}
                            closeModal={closeModalDispatch}
                            origins={origins}
                            editGlobalProduct={editProduct}
                            isSubmitError={isSubmitError}
                        />
                    ) : (
                        <CreateProduct
                            currentProduct={currentProduct}
                            closeModal={closeModalDispatch}
                            origins={origins}
                            addNewProduct={addNewProduct}
                            isSubmitError={isSubmitError}
                        />
                    ))}
            </Router>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        products: productsSelector(state),
        cart: cartProductsSelector(state),
        options: optionsSelector(state),
        cartItems: cartItemsSelector(state),
        cartTotal: cartTotalSelector(state),
        queryOptions: queryOptionsSelector(state),
        modal: modalStateSelector(state),
        currentProduct: currentProductSelector(state),
        origins: globalOriginsSelector(state),
        productsCount: productsCountSelector(state),
        globalCurrentProduct: globalCurrentProductSelector(state),
        orders: ordersSelector(state),
        currentOrder: currentOrderSelector(state),
        isSubmitError: submitErrorSelector(state),
    };
}

const mapDispatchToProps = {
    getProductsDispatch: getProducts,
    addProductToCartDispatch: addProductToCart,
    removeProductFromCartDispatch: removeProductFromCart,
    changeProductCountDispatch: changeProductCount,
    increseProductCountDispatch: increseProductCount,
    decreseProductCountDispacth: decreseProductCount,
    setOriginsDispatch: setOrigins,
    setPerPageDispatch: setPerPage,
    changePriceRangeDispatch: changePriceRange,
    openModalDispatch: openModal,
    closeModalDispatch: closeModal,
    clearCartDispatch: clearCart,
    setCurrentPage: setCurrentPage,
    originsRequest: originsRequest,
    setTotalCount: setTotalCount,
    productsRequest: productsRequest,
    currentProductRequest: currentProductRequest,
    ordersRequest: ordersRequest,
    currentOrderRequest: currentOrderRequest,
    createOrder: createOrder,
    addNewProduct: addNewProduct,
    editProduct: editProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
