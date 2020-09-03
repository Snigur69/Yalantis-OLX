import React from "react";
import PropTypes from "prop-types";
import styles from "../assets/css/pagination.module.css";

const Pagination = (props) => {
    return (
        <div className={styles.pagination}>
            {props.currentPage !== 1 && (
                <a onClick={(e) => props.setCurrentPage(props.currentPage - 1)}>
                    🡸
                </a>
            )}
            {props.pages.map((el) => {
                if (el == props.currentPage) {
                    return (
                        <a
                            className={styles.current_page}
                            onClick={props.getPage}
                            key={el}
                            value={el}
                        >
                            {el}
                        </a>
                    );
                } else {
                    return (
                        <a onClick={props.getPage} key={el} value={el}>
                            {el}
                        </a>
                    );
                }
            })}
            {props.currentPage !== props.pages.length && (
                <a onClick={(e) => props.setCurrentPage(props.currentPage + 1)}>
                    🡺
                </a>
            )}
        </div>
    );
};

Pagination.propTypes = {
    pages: PropTypes.array,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number,
    getPage: PropTypes.func,
};

export default Pagination;
