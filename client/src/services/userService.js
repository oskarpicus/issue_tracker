import {loginHttp, responseTypes} from "../components/const";
import axios from "axios";

export const login = async (formValues) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await axios.post(loginHttp.URI, JSON.stringify(formValues), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
};