import {
    createUserHttp,
    getAllUsernamesHttp,
    getUserByUsernameHttp,
    loginHttp,
    responseTypes
} from "../const";
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

export const getUser = async (username, token) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        let url = getUserByUsernameHttp.URI;
        url = url.replace(":username", username);
        const response = await axios.get(url, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}

export const getAllUsernames = async (token) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        const response = await axios.get(getAllUsernamesHttp.URI, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}
