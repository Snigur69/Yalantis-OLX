import React from "react";
import PropTypes from "prop-types";
import styles from "../assets/css/filter.module.css";

const Filter = (props) => {
    return (
        <div className={styles.filter}>
            <div>
                <p className={styles.attr_name}>Цена</p>
                <div className={styles.price_wrap}>
                    от
                    <input
                        value={props.minValue}
                        onChange={props.changeMinPrice}
                    />
                    до
                    <input
                        value={props.maxValue}
                        onChange={props.changeMaxPrice}
                    />
                    <button onClick={props.changePriceRange}>OK</button>
                </div>
            </div>

            <p className={styles.attr_name}>Страна происхождения:</p>
            <div className={styles.attr_wrap}>
                {props.origins.map((el) => {
                    return (
                        <div key={el.value} className={styles.single_origin}>
                            <label>
                                <input
                                    onChange={props.getProductsByOrigin}
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
                <select
                    value={props.options.perPage}
                    onChange={props.perPageChange}
                >
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
