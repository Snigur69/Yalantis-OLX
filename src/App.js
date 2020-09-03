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
} from "./selectors/selectors";

const App = (props) => {
    const addToCart = (e) => {
        let newProduct = {
            id: e.target.dataset.productid,
            name: e.target.dataset.productname,
            count: 1,
            price: +e.target.dataset.productprice,
            summaryPrice: +e.target.dataset.productprice,
        };
        props.addProductToCart(newProduct);
    };

    const removeProduct = (e) => {
        let removedIndex;
        for (let i = 0; i < props.cart.length; i++) {
            if (e.target.dataset.productid === props.cart[i].id) {
                removedIndex = i;
            }
        }
        props.removeProductFromCart(removedIndex);
    };

    const changeProductCount = (e) => {
        if (!isNaN(e.target.value)) {
            props.changeProductCount(
                e.target.dataset.id,
                e.target.value.replace(/\D/, "")
            );
        }
    };
    const increseProductCount = (e) => {
        props.increseProductCount(e.target.dataset.id);
    };
    const decreseProductCount = (e) => {
        props.decreseProductCount(e.target.dataset.id);
    };
    return (
        <div className="store">
            <Router>
                <Switch>
                    <Route path="/cart">
                        <CartPage
                            products={props.cart}
                            productsCount={props.cartItems}
                            summaryPrice={props.cartTotal}
                            removeProduct={removeProduct}
                            changeProductCount={changeProductCount}
                            increseProductCount={increseProductCount}
                            decreseProductCount={decreseProductCount}
                        />
                    </Route>
                    <Route
                        path="/product/:id"
                        render={(innerProps) => (
                            <ProductPage
                                {...innerProps}
                                addToCart={addToCart}
                                summaryPrice={props.cartTotal}
                            />
                        )}
                    />

                    <Route path="/">
                        <CatalogPage
                            products={props.products}
                            getProducts={props.getProducts}
                            summaryPrice={props.cartTotal}
                            addToCart={addToCart}
                            setOrigins={props.setOrigins}
                            options={props.options}
                            queryOptions={props.queryOptions}
                            setPerPage={props.setPerPage}
                            changePriceRange={props.changePriceRange}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        products: state.products,
        cart: state.cart,
        options: state.options,
        cartItems: cartItemsSelector(state),
        cartTotal: cartTotalSelector(state),
        queryOptions: queryOptionsSelector(state),
    };
}

let actions = {
    getProducts,
    addProductToCart,
    removeProductFromCart,
    changeProductCount,
    increseProductCount,
    decreseProductCount,
    setOrigins,
    setPerPage,
    changePriceRange,
};

export default connect(mapStateToProps, actions)(App);
