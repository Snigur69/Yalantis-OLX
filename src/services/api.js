import axios from "axios";
import { PRODUCTS_API } from "../constants/constants";

export default axios.create({
    baseURL: PRODUCTS_API,
});
