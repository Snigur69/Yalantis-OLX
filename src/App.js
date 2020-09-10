import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import CatalogPage from "./pages/CatalogPage";
import { connect } from "react-redux";
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
} from "./store/actions";
import {
    cartItemsSelector,
    cartTotalSelector,
    queryOptionsSelector,
    cartProductsSelector,
    productsSelector,
    optionsSelector,
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
}) => {
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
    return (
        <div className="store">
            <Router>
                <Switch>
                    <Route path="/cart">
                        <CartPage
                            products={cart}
                            productsCount={cartItems}
                            summaryPrice={cartTotal}
                            removeProduct={removeProduct}
                            changeProductCount={handleChangeProductCount}
                            increseProductCount={handleIncreseProductCount}
                            decreseProductCount={handleDecreseProductCount}
                        />
                    </Route>
                    <Route
                        path="/product/:id"
                        render={(innerProps) => (
                            <ProductPage
                                {...innerProps}
                                addToCart={addToCart}
                                summaryPrice={cartTotal}
                            />
                        )}
                    />

                    <Route path="/">
                        <CatalogPage
                            products={products}
                            getProducts={getProductsDispatch}
                            summaryPrice={cartTotal}
                            addToCart={addToCart}
                            setOrigins={setOriginsDispatch}
                            options={options}
                            queryOptions={queryOptions}
                            setPerPage={setPerPageDispatch}
                            changePriceRange={changePriceRangeDispatch}
                        />
                    </Route>
                </Switch>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
