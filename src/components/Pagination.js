import React from "react";
import PropTypes from "prop-types";
import styles from "../assets/css/pagination.module.css";

const Pagination = ({ pages, setCurrentPage, currentPage, getPage }) => {
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    return (
        <div className={styles.pagination}>
            {currentPage !== 1 && (
                <p className={styles.page} onClick={handlePrevPage}>
                    🡸
                </p>
            )}
            {pages.map((el) => {
                if (el === currentPage) {
                    return (
                        <p
                            className={styles.current_page + " " + styles.page}
                            onClick={getPage}
                            key={`pageid${el}`}
                            value={el}
                        >
                            {el}
                        </p>
                    );
                } else {
                    return (
                        <p
                            className={styles.page}
                            onClick={getPage}
                            key={`pageid${el}`}
                            value={el}
                        >
                            {el}
                        </p>
                    );
                }
            })}
            {currentPage !== pages.length && (
                <p className={styles.page} onClick={handleNextPage}>
                    🡺
                </p>
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
