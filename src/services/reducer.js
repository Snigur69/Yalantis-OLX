export default function reducer(state, action) {
    switch (action.type) {
        case "ADD_PRODUCT": {
            let newProduct = {
                id: action.payload.dataset.productid,
                name: action.payload.dataset.productname,
                count: 1,
                price: +action.payload.dataset.productprice,
                summaryPrice: +action.payload.dataset.productprice,
            };
            let duplicatedIndex;
            let duplicatedProduct = state.filter((el, ind) => {
                if (newProduct.id === el.id) {
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
            return [...state, newProduct];
        }
        case "REMOVE_PRODUCT": {
            let copyCartProducts = [...state];
            copyCartProducts.splice(action.index, 1);
            return copyCartProducts;
        }
        default:
            return state;
    }
}
