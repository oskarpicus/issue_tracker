import './App.css';
import CreateAccountForm from "./pages/createAccountForm/CreateAccountForm";
import {createRef, useEffect, useState} from "react";
import MySnackbar from "./components/mySnackbar/MySnackbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createAccountPage, loginPage, viewProjectsPage} from "./components/const";
import LoginForm from "./pages/loginForm/LoginForm";
import ErrorPage from "./pages/errorPage/ErrorPage";
import ViewProjectsPage from "./pages/viewProjectsPage/ViewProjectsPage";

function App() {
    const [alert, setAlert] = useState({
        state: false,
        severity: "",
        message: "",
        backgroundColor: "inherit"
    });

    const [credentials, setCredentials] = useState(
        JSON.parse(window.localStorage.getItem("credentials")) ||
        {
            jwt: "",
            user: undefined
        }
    );

    const snackbarRef = createRef();

    useEffect(() => {
        window.localStorage.setItem("credentials", JSON.stringify(credentials));
    }, [credentials]);

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
                    <Route exact={true} path={viewProjectsPage}>
                        <ViewProjectsPage credentials={credentials}/>
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
