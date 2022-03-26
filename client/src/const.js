export const websiteTitle = "Bugsby";

export const serverErrorMessage = "Server is not responding. Try again later";

export const createdAccountMessage = "Account created successfully";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * Object that encapsulated the details of the request made to the server to create a new account
 * @type {{method: string, URI: string}}
 */
export const createUserHttp = {method: "POST", URI: apiUrl + "/users"};

/**
 * Object that encapsulates the details of the request made to the server to login
 * @type {{method: string, URI: string}}
 */
export const loginHttp = {method: "POST", URI: apiUrl + "/users/login"};

/**
 * Object that encapsulates the details of the request made to the server for accessing the projects of a user
 * @type {{method: string, URI: string}}
 */
export const getInvolvementsHttp = {method: "GET", URI: apiUrl + "/involvements?username=:username"};

/**
 * Object that encapsulates the details of the request made to the server for accessing a user by their username
 * @type {{method: string, URI: string}}
 */
export const getUserByUsernameHttp = {method: "GET", URI: apiUrl + "/users?username=:username"};

/**
 * Object that encapsulates the details of the request made to the server for accessing a project by its identifier
 * @type {{method: string, URI: string}}
 */
export const getProjectByIdHttp = {method: "GET", URI: apiUrl + "/projects/:id"};

/**
 * Object that encapsulates the details of the request made to the server for accessing all the available project roles
 * @type {{method: string, URI: string}}
 */
export const getRolesHttp = {method: "GET", URI: apiUrl + "/roles"};

/**
 * Object that encapsulates the details of the request made to the server for adding a project
 * @type {{method: string, URI: string}}
 */
export const addProjectHttp = {method: "POST", URI: apiUrl + "/projects"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving all usernames
 * @type {{method: string, URI: string}}
 */
export const getAllUsernamesHttp = {method: "GET", URI: apiUrl + "/users/usernames"};

/**
 * Object that encapsulates the details of the request made to the server for adding a participant to a project
 * @type {{method: string, URI: string}}
 */
export const addParticipantHttp = {method: "POST", URI: apiUrl + "/involvements"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue types
 * @type {{method: string, URI: string}}
 */
export const getIssueTypesHttp = {method: "GET", URI: apiUrl + "/issue-types"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue statuses
 * @type {{method: string, URI: string}}
 */
export const getStatusesHttp = {method: "GET", URI: apiUrl + "/statuses"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue severities
 * @type {{method: string, URI: string}}
 */
export const getSeveritiesHttp = {method: "GET", URI: apiUrl + "/severities"};

/**
 * Object that encapsulates the details of the request made to the server for adding a new issue
 * @type {{method: string, URI: string}}
 */
export const addIssueHttp = {method: "POST", URI: apiUrl + "/issues"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the assigned issues of a user
 * @type {{method: string, URI: string}}
 */
export const getAssignedIssuesHttp = {method: "GET", URI: apiUrl + "/issues?assignee=:username"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving an issue by its identifier
 * @type {{method: string, URI: string}}
 */
export const getIssueByIdHttp = {method: "GET", URI: apiUrl + "/issues/:id"};

/**
 * Object that encapsulates the details of the request made to the server for deleting an issue by its identifier
 * @type {{method: string, URI: string}}
 */
export const deleteIssueByIdHttp = {method: "DELETE", URI: apiUrl + "/issues/:id"};

/**
 * Object that encapsulates the details of the request made to the server for updating an issue
 * @type {{method: string, URI: string}}
 */
export const updateIssueHttp = {method: "PUT", URI: apiUrl + "/issues/:id"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the suggested severity of an issue
 * @type {{method: string, URI: string}}
 */
export const getSuggestedSeverityHttp = {method: "GET", URI: apiUrl + "/suggested-severity?title=:title"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the suggested type for an issue
 * @type {{method: string, URI: string}}
 */
export const getSuggestedIssueTypeHttp = {method: "GET", URI: apiUrl + "/suggested-type?title=:title"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible duplicates of an issue
 * @type {{method: string, URI: string}}
 */
export const retrieveDuplicateIssuesHttp = {method: "POST", URI: apiUrl + "/issues/duplicates"};

/**
 * The page address for visiting the page dedicated for creating an account
 * @type {string}
 */
export const createAccountPage = "/create-account";

/**
 * The page address for logging in the application
 * @type {string}
 */
export const loginPage = "/";

/**
 * The page address for accessing the error message page
 * @type {string}
 */
export const errorPage = "/error";

/**
 * The page address for visiting the projects of a specific user, based on their username
 * @type {string}
 */
export const viewProjectsPage = "/:username/projects";

/**
 * The page address for visiting the details page of a single project
 * @type {string}
 */
export const viewSingleProjectPage = "/projects/:id";

/**
 * The page address for visiting the form to add a project
 * @type {string}
 */
export const addProjectPage = "/add-project";

/**
 * The page address for visiting the form to add an issue
 * @type {string}
 */
export const addIssuePage = "/projects/:id/add-issue";

/**
 * The page address for visiting the assigned issues of a user
 * @type {string}
 */
export const viewAssignedIssuesPage = "/:username/assigned-issues";

/**
 * The page address for visiting the page dedicated to a certain issue
 * @type {string}
 */
export const viewIssuePage = "/issues/:id";

/**
 * The page address for visiting the page dedicated to viewing possible duplicate issues.
 * The user is redirected to this page when trying to add a new issue
 * @type {string}
 */
export const viewDuplicateIssues = "/duplicate-issues";

/**
 * Defines how a call to the backend can result. This information will be added in the "key" field of the response.
 * @type {{success: string, error: string, key: string}}
 */
export const responseTypes = {
    key: "type",
    keyFallback: "responseKey",
    error: "error",
    success: "success"
};
