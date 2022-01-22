import axios from "axios";
import {getSuggestedSeverityHttp, responseTypes} from "../components/const";

export const getSuggestedSeverity = async (token, title) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const url = getSuggestedSeverityHttp.URI.replace(":title", title);
        const response = await axios.get(url, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
};
