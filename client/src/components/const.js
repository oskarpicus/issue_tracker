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
 * Defines how a call to the backend can result. This information will be added in the "key" field of the response.
 * @type {{success: string, error: string, key: string}}
 */
const responseTypes = {
    key: "type",
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
    loginPage,
    createAccountPage,
    errorPage,
    viewProjectsPage,
    viewSingleProjectPage,
    responseTypes
}