import axios from "axios";
import {
    addIssueHttp,
    deleteIssueByIdHttp,
    getAssignedIssuesHttp,
    getIssueByIdHttp,
    responseTypes,
    retrieveDuplicateIssuesHttp,
    updateIssueHttp
} from "../const";

export const retrieveDuplicateIssues = async (token, issue) => {
    try {
        let configuration = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.post(retrieveDuplicateIssuesHttp.URI, JSON.stringify(issue), configuration);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (e) {
        e.response[responseTypes.key] = responseTypes.error;
        return e.response;
    }
}

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
        response.data[responseTypes.keyFallback] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.keyFallback] = responseTypes.error;
        return error.response;
    }
}

export const updateIssue = async (token, issue) => {
    try {
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        };

        const response = await axios.put(updateIssueHttp.URI.replaceAll(":id", issue.id), issue, config);
        response.data[responseTypes.keyFallback] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.keyFallback] = responseTypes.error;
        return error.response;
    }
}
