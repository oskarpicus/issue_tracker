import {createAccountPage, websiteTitle} from "./const";
import LabeledField from "./LabeledField";
import SubmitButton from "./SubmitButton";
import './../loginForm.css';
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import {Link} from "react-router-dom";
import {useState} from "react";
import {Drawer} from "@mui/material";
import PestControlIcon from '@mui/icons-material/PestControlOutlined';

const LoginForm = ({setAlert}) => {
    let initialValues = {
        username: "",
        password: ""
    };
    let [formValues, setFormValues] = useState(initialValues);

    const labels = ["Username", "Password"];

    let onInputValueChanged = (name, value) => {
        setFormValues((prev) => ({...prev, [name]: value}))
    };

    const onSubmit = (e) => {
        // todo proper implement it
        e.preventDefault();
        const backgroundColorSnackbar = "#112D4E";
        setAlert({
            state: true,
            severity: "error",
            message: "Some message",
            backgroundColor: backgroundColorSnackbar
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