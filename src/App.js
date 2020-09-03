import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import CatalogPage from "./pages/CatalogPage";
import reducer from "./services/reducer";

const App = () => {
    const [cartProducts, dispatch] = useReducer(reducer, []);
    const [productsCount, setProductsCount] = useState(0);
    const [summaryPrice, setSummaryPrice] = useState(0);

    const addToCart = (e) => {
        dispatch({
            type: "ADD_PRODUCT",
            payload: e.target,
        });
        setProductsCount(productsCount + 1);
        setSummaryPrice(summaryPrice + +e.target.dataset.productprice);
    };

    const removeProduct = (e) => {
        let removedPrice;
        let removedCount;
        let removedIndex;
        for (let i = 0; i < cartProducts.length; i++) {
            if (e.target.dataset.productid === cartProducts[i].id) {
                removedPrice = cartProducts[i].summaryPrice;
                removedCount = cartProducts[i].count;
                removedIndex = i;
            }
        }
        dispatch({
            type: "REMOVE_PRODUCT",
            index: removedIndex,
        });
        setSummaryPrice(summaryPrice - removedPrice);
        setProductsCount(productsCount - removedCount);
    };
    return (
        <div className="store">
            <Router>
                <Switch>
                    <Route path="/cart">
                        <CartPage
                            products={cartProducts}
                            productsCount={productsCount}
                            summaryPrice={summaryPrice}
                            removeProduct={removeProduct}
                        />
                    </Route>
                    <Route
                        path="/product/:id"
                        render={(props) => (
                            <ProductPage
                                {...props}
                                summaryPrice={summaryPrice}
                                addToCart={addToCart}
                            />
                        )}
                    />

                    <Route path="/">
                        <CatalogPage
                            summaryPrice={summaryPrice}
                            addToCart={addToCart}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
