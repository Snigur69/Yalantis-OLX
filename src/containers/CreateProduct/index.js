import React, { useState } from "react";
import { Formik } from "formik";
import { object, string, number } from "yup";
import { token } from "../../constants/constants";
import api from "../../services/api";
import PropTypes from "prop-types";

import Select from "react-select";
import Portal from "../../components/Portal/index";
import styles from "./styles.module.css";

const CreateProduct = ({ closeModal, currentProduct, origins }) => {
    const [isSubmitError, setisSubmitError] = useState(false);

    const createNewProduct = async ({ name, price, origin }) => {
        await api({
            method: "post",
            url: "/products",
            headers: {
                "Content-Type": " application/json",
                Authorization: token,
            },
            data: JSON.stringify({
                product: {
                    name,
                    price: Number(price),
                    origin: origin.value,
                },
            }),
        })
            .then((response) => {
                setisSubmitError(false);
                closeModal();
            })
            .catch((error) => {
                setisSubmitError(true);
            });
    };
    const editProduct = async ({ name, price, origin }) => {
        await api({
            method: "patch",
            url: `/products/${currentProduct.id}`,
            headers: {
                "Content-Type": " application/json",
                Authorization: token,
            },
            data: JSON.stringify({
                product: {
                    name,
                    price: Number(price),
                    origin: origin.value,
                },
            }),
        })
            .then((response) => {
                setisSubmitError(false);
                closeModal();
            })
            .catch((error) => {
                setisSubmitError(true);
            });
    };

    return (
        <Portal>
            <div className={styles.modal_wrap}>
                <button
                    className={styles.close_modal}
                    onClick={closeModal}
                ></button>
                {currentProduct.id ? (
                    <h1 className={styles.modal_title}>Изменить товар</h1>
                ) : (
                    <h1 className={styles.modal_title}>Добавить товар</h1>
                )}
                <Formik
                    initialValues={{
                        name: currentProduct.name,
                        price: currentProduct.price,
                        origin: origins.filter(
                            (option) => option.value === currentProduct.origin
                        )[0],
                    }}
                    validationSchema={object().shape({
                        name: string()
                            .min(3, "Минимум 3 символа")
                            .max(20, "Максимум 20 символов")
                            .required("Поле обязательное!"),
                        price: number()
                            .moreThan(0, "Больше чем 0")
                            .required("Поле обязательное!"),
                        origin: object().shape({
                            value: string().required("Поле обязательное!"),
                        }),
                    })}
                    onSubmit={(values) =>
                        currentProduct.id
                            ? editProduct(values)
                            : createNewProduct(values)
                    }
                >
                    {({
                        values,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        setFieldValue,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div
                                className={
                                    styles.field_wrap + " " + styles.input_wrap
                                }
                            >
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.name && styles.error_input
                                    }
                                    name="name"
                                    placeholder="Name"
                                    value={values.name}
                                    onBlur={handleBlur}
                                    error={errors.name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className={styles.error}>
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div
                                className={
                                    styles.field_wrap + " " + styles.input_wrap
                                }
                            >
                                <input
                                    disabled={isSubmitting}
                                    className={
                                        errors.price && styles.error_input
                                    }
                                    name="price"
                                    type="number"
                                    placeholder="Price"
                                    onBlur={handleBlur}
                                    value={values.price}
                                    error={errors.price}
                                    onChange={(e) =>
                                        setFieldValue(
                                            "price",
                                            e.target.value.replace(/^0+/, "")
                                        )
                                    }
                                />
                                {errors.price && (
                                    <p className={styles.error}>
                                        {errors.price}
                                    </p>
                                )}
                            </div>
                            <div className={styles.field_wrap}>
                                <Select
                                    isDisabled={isSubmitting}
                                    getOptionLabel={(option) =>
                                        option.displayName
                                    }
                                    value={values.origin}
                                    name="origin"
                                    options={origins}
                                    onBlur={handleBlur}
                                    placeholder="Origins"
                                    error={errors.origin}
                                    onChange={(origin) =>
                                        setFieldValue("origin", origin)
                                    }
                                />
                                {errors.origin && (
                                    <p className={styles.error}>
                                        {errors.origin.value}
                                    </p>
                                )}
                            </div>

                            {isSubmitError && (
                                <p className={styles.error}>
                                    Название должно быть уникальным!
                                </p>
                            )}
                            {currentProduct.id ? (
                                <div className={styles.buttons_wrap}>
                                    <button
                                        disabled={isSubmitting}
                                        className={styles.reset_button}
                                        onClick={handleReset}
                                    >
                                        Сбросить изменения
                                    </button>
                                    <br />
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Подтвердить изменения
                                    </button>
                                    <button
                                        disabled={isSubmitting}
                                        onClick={closeModal}
                                    >
                                        Отменить редактирование
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.buttons_wrap}>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                    >
                                        Добавить товар
                                    </button>
                                </div>
                            )}
                        </form>
                    )}
                </Formik>
            </div>
        </Portal>
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
