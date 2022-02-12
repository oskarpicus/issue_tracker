import LabeledField from "../../components/labeledField/LabeledField";
import SubmitButton from "../../components/submitButton/SubmitButton";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import {createdAccountMessage, loginPage, responseTypes, websiteTitle} from "../../const";
import {useState} from "react";
import {Link} from "react-router-dom";
import {createAccount} from "../../services/userService";
import './createAccountForm.css';

const CreateAccountForm = ({setAlert}) => {
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

        createAccount(formValues)
            .then(response => {
                let message = response[responseTypes.key] === responseTypes.success ? createdAccountMessage : response.data;
                setAlert({
                    state: true,
                    severity: response[responseTypes.key],
                    message: message,
                    backgroundColor: "inherit"
                });
            });
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
