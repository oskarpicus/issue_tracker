import './App.css';
import CreateAccountForm from "./pages/createAccountForm/CreateAccountForm";
import {createRef, useState} from "react";
import MySnackbar from "./components/mySnackbar/MySnackbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createAccountPage, dashboardPage, loginPage} from "./components/const";
import LoginForm from "./pages/loginForm/LoginForm";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/errorPage/ErrorPage";

function App() {
    const [alert, setAlert] = useState({
        state: false,
        severity: "",
        message: "",
        backgroundColor: "inherit"
    });
    const [credentials, setCredentials] = useState({
        jwt: "",
        user: undefined
    })
    const snackbarRef = createRef();

    return (
        <BrowserRouter>
            <div className="App">
                <MySnackbar ref={snackbarRef} alert={alert} setAlert={setAlert}/>
                <Switch>
                    <Route exact={true} path={createAccountPage}>
                        <CreateAccountForm setAlert={setAlert}/>
                    </Route>
                    <Route exact={true} path={loginPage}>
                        <LoginForm setAlert={setAlert} setCredentials={setCredentials}/>
                    </Route>
                    <Route exact={true} path={dashboardPage}>
                        <Dashboard credentials={credentials}/>
                    </Route>
                    {/* Will fallback to every other accessed URL */}
                    <Route>
                        <ErrorPage/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
