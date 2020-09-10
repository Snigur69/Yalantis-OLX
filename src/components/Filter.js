import React from "react";
import PropTypes from "prop-types";
import styles from "../assets/css/filter.module.css";

const Filter = ({
    getProductsByOrigin,
    changeMinPrice,
    changeMaxPrice,
    changePriceRange,
    perPageChange,
    minValue,
    maxValue,
    origins,
    options,
}) => {
    return (
        <div className={styles.filter}>
            <div>
                <p className={styles.attr_name}>Цена</p>
                <div className={styles.price_wrap}>
                    от
                    <input
                        className={styles.price_input}
                        value={minValue}
                        onChange={changeMinPrice}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    />
                    до
                    <input
                        className={styles.price_input}
                        value={maxValue}
                        onChange={changeMaxPrice}
                        onPaste={(e) => {
                            e.preventDefault();
                            return false;
                        }}
                    />
                    <button
                        className={styles.price_submit}
                        onClick={changePriceRange}
                    >
                        OK
                    </button>
                </div>
            </div>

            <p className={styles.attr_name}>Страна происхождения:</p>
            <div className={styles.attr_wrap}>
                {origins.map((el) => {
                    return (
                        <div key={el.id} className={styles.single_origin}>
                            <label>
                                <input
                                    onChange={getProductsByOrigin}
                                    id={el.value}
                                    type="checkbox"
                                    name={el.value}
                                    checked={el.isChecked}
                                />
                                {el.displayName}
                            </label>
                        </div>
                    );
                })}
            </div>
            <p className={styles.attr_name}>Количество товаров на странице</p>
            <div className={styles.attr_wrap}>
                <select value={options.perPage} onChange={perPageChange}>
                    <option value="50">50</option>
                    <option value="25">25</option>
                    <option value="10">10</option>
                </select>
            </div>
        </div>
    );
};

Filter.propTypes = {
    getProductsByOrigin: PropTypes.func,
    changeMinPrice: PropTypes.func,
    changeMaxPrice: PropTypes.func,
    changePriceRange: PropTypes.func,
    perPageChang: PropTypes.func,
    origins: PropTypes.array,
    options: PropTypes.shape({
        perPage: PropTypes.number,
        origins: PropTypes.array,
        minPrice: PropTypes.number,
        maxPrice: PropTypes.number,
    }),
};

export default Filter;
