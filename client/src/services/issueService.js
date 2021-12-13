import axios from "axios";
import {
    addIssueHttp,
    deleteIssueByIdHttp,
    getAssignedIssuesHttp,
    getIssueByIdHttp,
    responseTypes
} from "../components/const";

export const addIssue = async (token, issue) => {
    try {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await axios.post(addIssueHttp.URI, JSON.stringify(issue), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
};

export const getAssignedIssues = async (token, username) => {
    try {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await axios.get(getAssignedIssuesHttp.URI.replaceAll(":username", username), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}

export const getIssueById = async (token, id) => {
    try {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await axios.get(getIssueByIdHttp.URI.replaceAll(":id", id), config);
        response.data[responseTypes.keyFallback] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}

export const deleteIssue = async (token, id) => {
    try {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await axios.delete(deleteIssueByIdHttp.URI.replaceAll(":id", id), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}
