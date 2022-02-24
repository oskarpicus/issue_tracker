import axios from "axios";
import {getSuggestedIssueTypeHttp, getSuggestedSeverityHttp, responseTypes} from "../const";

const doRequest = async (token, url) => {
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
};

export const getSuggestedSeverity = async (token, title) => {
    const url = getSuggestedSeverityHttp.URI.replace(":title", title);
    return doRequest(token, url);
};

export const getSuggestedType = async (token, title) => {
    const url = getSuggestedIssueTypeHttp.URI.replace(":title", title)
    return doRequest(token, url);
};

