import './App.css';
import CreateAccountForm from "./components/CreateAccountForm";
import {createRef, useState} from "react";
import MySnackbar from "./components/MySnackbar";

function App() {
    const [alert, setAlert] = useState({
        state: false,
        severity: "",
        message: ""
    });
    const snackbarRef = createRef();

    return (
        <div className="App">
            <MySnackbar ref={snackbarRef} alert={alert} setAlert={setAlert}/>
            <CreateAccountForm setAlert={setAlert}/>
        </div>
    );
}

export default App;
