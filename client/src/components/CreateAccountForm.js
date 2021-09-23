import LabeledField from "./LabeledField";
import SubmitButton from "./SubmitButton";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import websiteTitle from "./const";
import {useState} from "react";

const CreateAccountForm = () => {
    let [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmedPassword: ""
    });

    let onInputValueChanged = (name, value) => {
        let values = {...formValues};
        values[name] = value;
        setFormValues(values)
    };

    let onSubmit = (e) => {
        console.log(`Form Values: ${formValues}`);
        e.preventDefault()
        if (formValues["password"] !== formValues["confirmedPassword"]) {
            // todo handle error when passwords do  not match
            return
        }

        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                console.log("Created account successfully");
                console.log(request.responseText);
            }
            else if (request.readyState === 4 && request.status !== 200) {
                console.log("Error " + request.responseText);
                // todo handle errors
            }
            else {
                // todo handle error regarding connection
            }
        };
        request.open("POST", "http://localhost:8080/users");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(formValues));
    }

    return (
        <div>
            <div className={"spaced"}>
                <div>
                    <BugReportOutlinedIcon/>
                    <span>{websiteTitle}</span>
                </div>
                <p>
                    <span>Already have an account? </span>
                    {/* todo replace with the actual page URI */}
                    <a href={"https://www.google.com"}>Sign in</a>
                </p>
            </div>
            <div>
                <p className={"action-title"}>Create an account</p>
                {/* todo to replace the URL with /users */}
                <form method={"POST"} action={"http://localhost:8080/users"} onSubmit={onSubmit}>
                    <LabeledField text={"First name"} name={"firstName"} onChange={onInputValueChanged}/>
                    <LabeledField text={"Last name"} name={"lastName"} onChange={onInputValueChanged}/>
                    <LabeledField text={"Username"} name={"username"} onChange={onInputValueChanged}/>
                    <LabeledField text={"Email"} name={"email"} onChange={onInputValueChanged}/>
                    <LabeledField text={"Password"} name={"password"} isHidden={true} onChange={onInputValueChanged}/>
                    <LabeledField text={"Confirm password"} name={"confirmedPassword"} isHidden={true} onChange={onInputValueChanged}/>
                    <SubmitButton text={"Create Your Account"}/>
                </form>
            </div>
        </div>
    )
};

export default CreateAccountForm;
