import React from "react";
import PropTypes from "prop-types";

import Form from "../../components/Form/index";

const EditProduct = ({
    closeModal,
    currentProduct,
    origins,
    editGlobalProduct,
    isSubmitError,
}) => {
    const editProduct = ({ name, price, origin }, { setSubmitting }) => {
        const product = {
            method: "patch",
            url: `/products/${currentProduct.id}`,
            data: { name, price, origin },
        };
        editGlobalProduct(product, setSubmitting);
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
    editGlobalProduct: PropTypes.func,
    isSubmitError: PropTypes.bool,
};

export default EditProduct;
