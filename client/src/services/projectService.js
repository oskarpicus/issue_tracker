import axios from "axios";
import {getInvolvementsHttp, getProjectByIdHttp, responseTypes} from "../components/const";

export const viewProjects = async (username, token) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };
        let url = getInvolvementsHttp.URI;
        url = url.replace(":username", username);
        const response = await axios.get(url, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
};

export const viewSingleProject = async (id, token) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        let url = getProjectByIdHttp.URI;
        url = url.replace(":id", id);
        const response = await axios.get(url, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}