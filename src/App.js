import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import CatalogPage from "./pages/CatalogPage";

const App = () => {
    const [cartProducts, setCardProducts] = useState([]);
    const [productsCount, setProductsCount] = useState(0);
    const [summaryPrice, setSummaryPrice] = useState(0);

    const addToCart = (e) => {
        let newProduct = {
            id: e.target.dataset.productid,
            name: e.target.dataset.productname,
            count: 1,
            price: +e.target.dataset.productprice,
            summaryPrice: +e.target.dataset.productprice,
        };
        let duplicatedIndex;
        let duplicatedProduct = cartProducts.filter((el, ind) => {
            if (newProduct.id === el.id) {
                duplicatedIndex = ind;
                return el;
            }
        });
        if (duplicatedProduct.length) {
            let copyCartProducts = [...cartProducts];
            duplicatedProduct[0].count++;
            duplicatedProduct[0].summaryPrice =
                duplicatedProduct[0].count * duplicatedProduct[0].price;
            copyCartProducts.splice(duplicatedIndex, 1, duplicatedProduct[0]);
            setCardProducts(copyCartProducts);
        } else {
            setCardProducts([...cartProducts, newProduct]);
        }
        setProductsCount(productsCount + 1);
        setSummaryPrice(summaryPrice + +e.target.dataset.productprice);
    };

    const removeProduct = (e) => {
        let copyCartProducts = [...cartProducts];
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
        copyCartProducts.splice(removedIndex, 1);

        setCardProducts(copyCartProducts);
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
