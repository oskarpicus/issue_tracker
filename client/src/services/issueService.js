import axios from "axios";
import {addIssueHttp, responseTypes} from "../components/const";

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
