import axios from "axios";
import {getRolesHttp, responseTypes} from "../components/const";

export const getAllProjectRoles = async (token) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.get(getRolesHttp.URI, config);
        response[responseTypes.key] = responseTypes.success;
        return response;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
};
