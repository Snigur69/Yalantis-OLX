import React, { useState } from "react";
import { API_TOKEN, PATHS } from "../../constants/constants";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "../../components/Form/index";

const CreateProduct = ({
    closeModal,
    currentProduct,
    origins,
    addNewProduct,
    isSubmitError,
}) => {
    // const [isSubmitError, setisSubmitError] = useState(false);
    const history = useHistory();

    const createNewProduct = ({ name, price, origin }, { setSubmitting }) => {
        const product = {
            method: "post",
            url: "/products",
            data: { name, price, origin },
        };
        addNewProduct(product, setSubmitting);
        // await api({
        //     method: "post",
        //     url: "/products",
        //     headers: {
        //         "Content-Type": " application/json",
        //         Authorization: API_TOKEN,
        //     },
        //     data: JSON.stringify({
        //         product: {
        //             name,
        //             price: Number(price),
        //             origin: origin.value,
        //         },
        //     }),
        // })
        //     .then((response) => {
        //         closeModal();
        //         history.location.pathname === PATHS.MY_PRODUCTS
        //             ? history.go(0)
        //             : history.push(PATHS.MY_PRODUCTS);
        //     })
        //     .catch((error) => {
        //         setisSubmitError(true);
        //     });
    };

    return (
        <Form
            closeModal={closeModal}
            title="Добавить товар"
            currentProduct={currentProduct}
            origins={origins}
            submitForm={createNewProduct}
            isSubmitError={isSubmitError}
            actionType="add"
        />
    );
};

CreateProduct.propTypes = {
    closeModal: PropTypes.func,
    currentProduct: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        origin: PropTypes.string,
    }),
    origins: PropTypes.array,
};

export default CreateProduct;
