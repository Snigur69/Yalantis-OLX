import React from "react";
import PropTypes from "prop-types";

import Form from "../../components/Form/index";

const CreateProduct = ({
    closeModal,
    currentProduct,
    origins,
    addNewProduct,
    isSubmitError,
}) => {
    const createNewProduct = ({ name, price, origin }, { setSubmitting }) => {
        const product = {
            method: "post",
            url: "/products",
            data: { name, price, origin },
        };
        addNewProduct(product, setSubmitting);
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
    addNewProduct: PropTypes.func,
    isSubmitError: PropTypes.bool,
};

export default CreateProduct;
