import axios from "axios";
import {addParticipantHttp, responseTypes} from "../const";

export const addInvolvement = async (data, token) => {
    try {
        let config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        };

        const response = await axios.post(addParticipantHttp.URI, JSON.stringify(data), config);
        response.data[responseTypes.key] = responseTypes.success;
        return response.data;
    } catch (error) {
        error.response[responseTypes.key] = responseTypes.error;
        return error.response;
    }
}