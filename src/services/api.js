import axios from "axios";
import {
    PRODUCTS_API,
    PRODUCTS_ORIGINS,
    API_TOKEN,
} from "../constants/constants";

export default axios.create({
    baseURL: PRODUCTS_API,
});

export const getOriginsFromApi = () =>
    axios({
        method: "get",
        baseURL: PRODUCTS_API,
        url: PRODUCTS_ORIGINS,
    })
        .then((response) => {
            return response.data.items;
        })
        .catch((error) => {
            throw new Error("Error with API");
        });

export const getProductsFromApi = ({ url, headers }) => {
    return axios({
        method: "get",
        baseURL: PRODUCTS_API,
        url: url,
        headers: headers,
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error("Error with API");
        });
};

export const getCurrentProductFromApi = (url) => {
    return axios({
        method: "get",
        baseURL: PRODUCTS_API,
        url: url,
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error("Error with API");
        });
};

export const getOrdersFromApi = () => {
    return axios({
        method: "get",
        baseURL: PRODUCTS_API,
        url: "/orders",
        headers: {
            "Content-Type": " application/json",
            Authorization: API_TOKEN,
        },
    })
        .then((response) => {
            return response.data.items;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const getCurrentOrderFromApi = (url) => {
    return axios({
        method: "get",
        baseURL: PRODUCTS_API,
        url: url,
        headers: {
            "Content-Type": " application/json",
            Authorization: API_TOKEN,
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const createOrderByApi = (order) => {
    return axios({
        method: "post",
        baseURL: PRODUCTS_API,
        url: "/orders",
        headers: {
            "Content-Type": " application/json",
            Authorization: API_TOKEN,
        },
        data: JSON.stringify({
            order: {
                pieces: order,
            },
        }),
    })
        .then((response) => {
            return response.data.id;
        })
        .catch((error) => {
            throw new Error(error);
        });
};

export const manageProduct = async ({ method, url, data }) => {
    return await axios({
        method: method,
        baseURL: PRODUCTS_API,
        url: url,
        headers: {
            "Content-Type": " application/json",
            Authorization: API_TOKEN,
        },
        data: JSON.stringify({
            product: {
                name: data.name,
                price: Number(data.price),
                origin: data.origin.value,
            },
        }),
    })
        .then((response) => {
            // return false;
            // closeModal();
            // history.location.pathname === PATHS.MY_PRODUCTS
            //     ? history.go(0)
            //     : history.push(PATHS.MY_PRODUCTS);
        })
        .catch((error) => {
            // return true;
            throw new Error(error);
        });
};
