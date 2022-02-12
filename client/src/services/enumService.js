import axios from "axios";
import {getIssueTypesHttp, getRolesHttp, getSeveritiesHttp, getStatusesHttp, responseTypes} from "../const";

const makeRequest = async (token, url) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.get(url, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}

export const getAllProjectRoles = async (token) => {
    return makeRequest(token, getRolesHttp.URI);
};

export const getAllIssueTypes = async (token) => {
    return makeRequest(token, getIssueTypesHttp.URI);
};

export const getAllStatuses = async (token) => {
    return makeRequest(token, getStatusesHttp.URI);
}

export const getAllSeverities = async (token) => {
    return makeRequest(token, getSeveritiesHttp.URI);
}

