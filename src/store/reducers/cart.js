let initialState = [];

export function cartReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART": {
            let duplicatedIndex;
            let duplicatedProduct = state.filter((el, ind) => {
                if (action.payload.id === el.id) {
                    duplicatedIndex = ind;
                    return el;
                }
            });
            if (duplicatedProduct.length) {
                let copyCartProducts = [...state];
                duplicatedProduct[0].count++;
                duplicatedProduct[0].summaryPrice =
                    duplicatedProduct[0].count * duplicatedProduct[0].price;
                copyCartProducts.splice(
                    duplicatedIndex,
                    1,
                    duplicatedProduct[0]
                );
                return copyCartProducts;
            }
            return [...state, action.payload];
        }
        case "REMOVE_PRODUCT_FROM_CART": {
            let copyCartProducts = [...state];
            copyCartProducts.splice(action.index, 1);
            return copyCartProducts;
        }
        case "INCRESE_PRODUCT_COUNT": {
            let copyCartProducts = [...state];
            let duplicatedIndex;
            let duplicatedProduct = state.filter((el, ind) => {
                if (action.id === el.id) {
                    duplicatedIndex = ind;
                    return el;
                }
            });
            ++duplicatedProduct[0].count;

            duplicatedProduct[0].summaryPrice += duplicatedProduct[0].price;
            copyCartProducts.splice(duplicatedIndex, 1, duplicatedProduct[0]);
            return copyCartProducts;
        }
        case "DECRESE_PRODUCT_COUNT": {
            let copyCartProducts = [...state];
            let duplicatedIndex;
            let duplicatedProduct = state.filter((el, ind) => {
                if (action.id === el.id) {
                    duplicatedIndex = ind;
                    return el;
                }
            });
            --duplicatedProduct[0].count;

            if (duplicatedProduct[0].count > 0) {
                duplicatedProduct[0].summaryPrice -= duplicatedProduct[0].price;
                copyCartProducts.splice(
                    duplicatedIndex,
                    1,
                    duplicatedProduct[0]
                );
                return copyCartProducts;
            }
            copyCartProducts.splice(duplicatedIndex, 1);
            return copyCartProducts;
        }
        case "CHANGE_PRODUCT_COUNT": {
            let copyCartProducts = [...state];
            let duplicatedIndex;
            let duplicatedProduct = state.filter((el, ind) => {
                if (action.id === el.id) {
                    duplicatedIndex = ind;
                    return el;
                }
            });
            duplicatedProduct[0].count = +action.value;

            duplicatedProduct[0].summaryPrice =
                duplicatedProduct[0].count * duplicatedProduct[0].price;
            copyCartProducts.splice(duplicatedIndex, 1, duplicatedProduct[0]);
            return copyCartProducts;
        }

        default:
            return state;
    }
}
