import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import styles from "./styles.module.css";

const Portal = ({ children }) => {
    const container = document.getElementById("modal");

    useEffect(() => {
        container.setAttribute("class", styles.wrapper);
        document.body.style.overflow = "hidden";
        return () => {
            container.setAttribute("class", "");
            document.body.style.overflow = "auto";
        };
    }, [container]);

    return createPortal(children, container);
};

Portal.propTypes = {
    children: PropTypes.element.isRequired,
};

export default Portal;
