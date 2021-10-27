import './App.css';
import CreateAccountForm from "./components/CreateAccountForm";
import {createRef, useState} from "react";
import MySnackbar from "./components/MySnackbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createAccountPage, loginPage} from "./components/const";
import LoginForm from "./components/LoginForm";

function App() {
    const [alert, setAlert] = useState({
        state: false,
        severity: "",
        message: "",
        backgroundColor: "inherit"
    });
    const [loggedUser, setLoggedUser] = useState({})
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
                        <LoginForm setAlert={setAlert} setLoggedUser={setLoggedUser}/>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
