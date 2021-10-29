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
 * Object that encapsulates the details of the request mde to the server to login
 * @type {{method: string, URI: string}}
 */
const loginHttp = {method: "POST", URI: "http://localhost:8080/users/login"}

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
 * The page address for visiting the dashboard
 * @type {string}
 */
const dashboardPage = "/dashboard";

export {
    websiteTitle,
    serverErrorMessage,
    createdAccountMessage,
    createUserHttp,
    loginHttp,
    loginPage,
    createAccountPage,
    dashboardPage
}