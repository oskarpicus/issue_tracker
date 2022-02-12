import {createAccountPage, responseTypes, viewProjectsPage, websiteTitle} from "../../const";
import LabeledField from "../../components/labeledField/LabeledField";
import SubmitButton from "../../components/submitButton/SubmitButton";
import './loginForm.css';
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import {Link, useHistory} from "react-router-dom";
import {useState} from "react";
import {Drawer} from "@mui/material";
import PestControlIcon from '@mui/icons-material/PestControlOutlined';
import {login} from "../../services/userService";

const LoginForm = ({setAlert, setCredentials}) => {
    let initialValues = {
        username: "",
        password: ""
    };
    let [formValues, setFormValues] = useState(initialValues);

    const labels = ["Username", "Password"];

    let onInputValueChanged = (name, value) => {
        setFormValues((prev) => ({...prev, [name]: value}))
    };

    let history = useHistory()

    const onSubmit = (e) => {
        e.preventDefault();
        const backgroundColorSnackbar = "#112D4E";
        login(formValues)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.error) {
                    setAlert({
                        state: true,
                        severity: "error",
                        message: response.data,
                        backgroundColor: backgroundColorSnackbar
                    })
                } else {
                    setCredentials(response);
                    history.push(viewProjectsPage.replace(":username", response.user.username));
                }
            });
    }

    return (
        <div id={"div-login-form"} className={"spaced"}>
            <Drawer
                variant={"permanent"}
                anchor={"left"}
                PaperProps={{elevation: 0}}
                className={"drawer"}
            >
                <div className={"website-title"} id={"website-title-login"}>
                    <BugReportOutlinedIcon fontSize={"large"}/>
                    <span>{websiteTitle}</span>
                </div>
                <p id={"text-big"}>The solution for managing your projects efficiently</p>
                <p id={"text-small"}>Start organising your issues with {websiteTitle}</p>
                <span id={"bugs-collection"}>
                    <PestControlIcon id={"bug1"} htmlColor={"white"} fontSize={"large"}/>
                    <PestControlIcon id={"bug2"} htmlColor={"white"} fontSize={"large"}/>
                    <PestControlIcon id={"bug3"} htmlColor={"white"} fontSize={"large"}/>
                    <PestControlIcon id={"bug4"} htmlColor={"white"} fontSize={"large"}/>
                    <PestControlIcon id={"bug5"} htmlColor={"white"} fontSize={"large"}/>
                    <PestControlIcon id={"bug6"} htmlColor={"white"} fontSize={"large"}/>
                </span>
            </Drawer>
            <div id={"div-right"}>
                <div id={"div-do-not-have-account"}>
                    <span className={"dark-text"}>Don't have an account? </span>
                    <Link className={"link"} to={createAccountPage}>Create one</Link>
                </div>
                <p className={"action-title"}>Login</p>
                <form method={"POST"} onSubmit={onSubmit}>
                    {
                        Object.keys(formValues).map((key, index) => (
                            <LabeledField
                                key={key}
                                text={labels[index]}
                                name={key}
                                onChange={onInputValueChanged}
                                type={new RegExp("password", "i").exec(key) ? "password" : "text"}
                            />
                        ))
                    }
                    <SubmitButton text={"Login"}/>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;