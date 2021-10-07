import {createAccountPage, websiteTitle} from "./const";
import LabeledField from "./LabeledField";
import SubmitButton from "./SubmitButton";
import './../loginForm.css';
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import {Link} from "react-router-dom";
import {useState} from "react";

const LoginForm = ({setAlert}) => {
    let initialValues = {
        username: "",
        password: ""
    };
    let [formValues, setFormValues] = useState(initialValues);

    const labels = ["Username", "Password"];

    const backgroundColorSnackbar = "#112D4E";

    let onInputValueChanged = (name, value) => {
        setFormValues((prev) => ({...prev, [name]: value}))
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setAlert({
            state: true,
            severity: "error",
            message: "Some message",
            backgroundColor: backgroundColorSnackbar
        });
    }

    return (
        <div className={"spaced"} id={"div-login-form"}>
            <div id={"div-left"}>
                <div className={"website-title"} id={"title"}>
                    <BugReportOutlinedIcon fontSize={"large"} htmlColor={"white"}/>
                    <span className={"white-text"}>{websiteTitle}</span>
                </div>
                <div className={"white-text"}>
                    <p>The solution for managing your projects efficiently</p>
                    <p>Start organising your issues with {websiteTitle}</p>
                </div>
            </div>
            <div id={"div-right"}>
                <div>
                    <span className={"dark-text"}>Don't have an account? </span>
                    <Link className={"link"} to={createAccountPage}>Create one</Link>
                </div>
                <div>
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
        </div>
    );
};

export default LoginForm;