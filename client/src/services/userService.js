import {createUserHttp, loginHttp, responseTypes} from "../components/const";
import axios from "axios";

const sendAxiosPost = async (uri, formValues) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const response = await axios.post(uri, JSON.stringify(formValues), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}

export const login = async (formValues) => {
    return sendAxiosPost(loginHttp.URI, formValues)
};

export const createAccount = async (userData) => {
    return sendAxiosPost(createUserHttp.URI, userData);
};