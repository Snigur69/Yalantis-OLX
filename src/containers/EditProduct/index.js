import React, { useState } from "react";
import { API_TOKEN } from "../../constants/constants";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import Form from "../../components/Form/index";

const EditProduct = ({
    closeModal,
    currentProduct,
    origins,
    editGlobalProduct,
    isSubmitError,
}) => {
    // const [isSubmitError, setisSubmitError] = useState(false);
    const history = useHistory();

    const editProduct = ({ name, price, origin }, { setSubmitting }) => {
        const product = {
            method: "patch",
            url: `/products/${currentProduct.id}`,
            data: { name, price, origin },
        };
        editGlobalProduct(product, setSubmitting);
        // setSubmitting(false);

        //  api({
        //     method: "patch",
        //     url: `/products/${currentProduct.id}`,
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
        //         history.go(0);
        //     })
        //     .catch((error) => {
        //         setisSubmitError(true);
        //     });
    };

    return (
        <Form
            closeModal={closeModal}
            title="Изменить товар"
            currentProduct={currentProduct}
            origins={origins}
            submitForm={editProduct}
            isSubmitError={isSubmitError}
            actionType="edit"
        />
    );
};

EditProduct.propTypes = {
    closeModal: PropTypes.func,
    currentProduct: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        origin: PropTypes.string,
    }),
    origins: PropTypes.array,
};

export default EditProduct;
