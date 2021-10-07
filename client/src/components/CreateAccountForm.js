import LabeledField from "./LabeledField";
import SubmitButton from "./SubmitButton";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import {websiteTitle, serverErrorMessage, createdAccountMessage, createUserHttp, loginPage} from "./const";
import {useState} from "react";
import {Link} from "react-router-dom";

const CreateAccountForm = ({setAlert}) => {
    console.log("A AINCEPUT CREATE ACCOUNT FORM")
    let initialValues = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmedPassword: ""
    }
    let [formValues, setFormValues] = useState({...initialValues});

    const labels = ["First Name", "Last Name", "Username", "Email", "Password", "Confirmed Password"];

    let onInputValueChanged = (name, value) => {
        setFormValues((prev) => ({...prev, [name]: value}))
    };

    let onSubmit = (e) => {
        console.log(`${JSON.stringify(formValues)}`)
        e.preventDefault()
        if (formValues["password"] !== formValues["confirmedPassword"]) {
            setAlert({
                state: true,
                severity: "error",
                message: "Passwords do not match",
                backgroundColor: "inherit"
            })
            return
        }

        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
                setAlert({
                    state: true,
                    severity: "success",
                    message: createdAccountMessage,
                    backgroundColor: "inherit"
                })
                setFormValues({...initialValues});
            } else if (request.readyState === 4) {
                setAlert({
                    state: true,
                    severity: "error",
                    message: request.responseText === "" ? serverErrorMessage : request.responseText,
                    backgroundColor: "inherit"
                });
            }
        };
        request.open(createUserHttp.method, createUserHttp.URI);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(formValues));
    }

    return (
        <div id={"create-account-page"}>
            <div className={"spaced"}>
                <div className={"website-title"}>
                    <BugReportOutlinedIcon fontSize={"large"}/>
                    <span>{websiteTitle}</span>
                </div>
                <p>
                    <span className={"dark-text"}>Already have an account? </span>
                    <Link className={"link"} to={loginPage}>Sign in</Link>
                </p>
            </div>
            <div>
                <p className={"action-title"}>Create an account</p>
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
                    <SubmitButton text={"Create Your Account"}/>
                </form>
            </div>
        </div>
    )
};

export default CreateAccountForm;
