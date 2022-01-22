const websiteTitle = "Bugsby";

const serverErrorMessage = "Server is not responding. Try again later";

const createdAccountMessage = "Account created successfully";

// todo replace with just /users
/**
 * Object that encapsulated the details of the request made to the server to create a new account
 * @type {{method: string, URI: string}}
 */
const createUserHttp = {method: "POST", URI: "http://localhost:8080/users"};

/**
 * Object that encapsulates the details of the request made to the server to login
 * @type {{method: string, URI: string}}
 */
const loginHttp = {method: "POST", URI: "http://localhost:8080/users/login"}

/**
 * Object that encapsulates the details of the request made to the server for accessing the projects of a user
 * @type {{method: string, URI: string}}
 */
const getInvolvementsHttp = {method: "GET", URI: "http://localhost:8080/involvements?username=:username"}

/**
 * Object that encapsulates the details of the request made to the server for accessing a user by their username
 * @type {{method: string, URI: string}}
 */
const getUserByUsernameHttp = {method: "GET", URI: "http://localhost:8080/users?username=:username"}

/**
 * Object that encapsulates the details of the request made to the server for accessing a project by its identifier
 * @type {{method: string, URI: string}}
 */
const getProjectByIdHttp = {method: "GET", URI: "http://localhost:8080/projects/:id"}

/**
 * Object that encapsulates the details of the request made to the server for accessing all the available project roles
 * @type {{method: string, URI: string}}
 */
const getRolesHttp = {method: "GET", URI: "http://localhost:8080/roles"}

/**
 * Object that encapsulates the details of the request made to the server for adding a project
 * @type {{method: string, URI: string}}
 */
const addProjectHttp = {method: "POST", URI: "http://localhost:8080/projects"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving all usernames
 * @type {{method: string, URI: string}}
 */
const getAllUsernamesHttp = {method: "GET", URI: "http://localhost:8080/users/usernames"}

/**
 * Object that encapsulates the details of the request made to the server for adding a participant to a project
 * @type {{method: string, URI: string}}
 */
const addParticipantHttp = {method: "POST", URI: "http://localhost:8080/involvements"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue types
 * @type {{method: string, URI: string}}
 */
const getIssueTypesHttp = {method: "GET", URI: "http://localhost:8080/issue-types"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue statuses
 * @type {{method: string, URI: string}}
 */
const getStatusesHttp = {method: "GET", URI: "http://localhost:8080/statuses"};

/**
 * Object that encapsulates the details of the request made to the server for retrieving the possible issue severities
 * @type {{method: string, URI: string}}
 */
const getSeveritiesHttp = {method: "GET", URI: "http://localhost:8080/severities"};

/**
 * Object that encapsulates the details of the request made to the server for adding a new issue
 * @type {{method: string, URI: string}}
 */
const addIssueHttp = {method: "POST", URI: "http://localhost:8080/issues"}

/**
 * Object that encapsulates the details of the request made to the server for retrieving the assigned issues of a user
 * @type {{method: string, URI: string}}
 */
const getAssignedIssuesHttp = {method: "GET", URI: "http://localhost:8080/issues?assignee=:username"}

/**
 * Object that encapsulates the details of the request made to the server for retrieving an issue by its identifier
 * @type {{method: string, URI: string}}
 */
const getIssueByIdHttp = {method: "GET", URI: "http://localhost:8080/issues/:id"}

/**
 * Object that encapsulates the details of the request made to the server for deleting an issue by its identifier
 * @type {{method: string, URI: string}}
 */
const deleteIssueByIdHttp = {method: "DELETE", URI: "http://localhost:8080/issues/:id"}

/**
 * Object that encapsulates the details of the request made to the server for updating an issue
 * @type {{method: string, URI: string}}
 */
const updateIssueHttp = {method: "PUT", URI: "http://localhost:8080/issues/:id"}

const getSuggestedSeverityHttp = {method: "GET", URI: "http://localhost:8080/suggested-severity?title=:title"}

/**
 * The page address for visiting the page dedicated for creating an account
 * @type {string}
 */
const createAccountPage = "/create-account";

/**
 * The page address for logging in the application
 * @type {string}
 */
const loginPage = "/";

/**
 * The page address for accessing the error message page
 * @type {string}
 */
const errorPage = "/error";

/**
 * The page address for visiting the projects of a specific user, based on their username
 * @type {string}
 */
const viewProjectsPage = "/:username/projects";

/**
 * The page address for visiting the details page of a single project
 * @type {string}
 */
const viewSingleProjectPage = "/projects/:id";

/**
 * The page address for visiting the form to add a project
 * @type {string}
 */
const addProjectPage = "/add-project";

/**
 * The page address for visiting the form to add an issue
 * @type {string}
 */
const addIssuePage = "/projects/:id/add-issue";

/**
 * The page address for visiting the assigned issues of a user
 * @type {string}
 */
const viewAssignedIssuesPage = "/:username/assigned-issues";

/**
 * The page address for visiting the page dedicated to a certain issue
 * @type {string}
 */
const viewIssuePage = "/issues/:id";

/**
 * Defines how a call to the backend can result. This information will be added in the "key" field of the response.
 * @type {{success: string, error: string, key: string}}
 */
const responseTypes = {
    key: "type",
    keyFallback: "responseKey",
    error: "error",
    success: "success"
}

export {
    websiteTitle,
    serverErrorMessage,
    createdAccountMessage,
    createUserHttp,
    loginHttp,
    getInvolvementsHttp,
    getUserByUsernameHttp,
    getProjectByIdHttp,
    addParticipantHttp,
    getIssueTypesHttp,
    getStatusesHttp,
    getSeveritiesHttp,
    addIssueHttp,
    getAssignedIssuesHttp,
    getIssueByIdHttp,
    deleteIssueByIdHttp,
    updateIssueHttp,
    getSuggestedSeverityHttp,
    loginPage,
    createAccountPage,
    errorPage,
    viewProjectsPage,
    viewSingleProjectPage,
    addProjectPage,
    getRolesHttp,
    addProjectHttp,
    getAllUsernamesHttp,
    addIssuePage,
    viewAssignedIssuesPage,
    viewIssuePage,
    responseTypes
}