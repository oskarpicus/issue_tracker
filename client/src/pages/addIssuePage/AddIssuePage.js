import {Redirect, useHistory, withRouter} from "react-router-dom";
import './AddIssuePage.css';
import {errorPage, responseTypes} from "../../components/const";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import Menu from "../../components/menu/Menu";
import MyComboBox from "../../components/myComboBox/MyComboBox";
import LabeledField from "../../components/labeledField/LabeledField";
import {getAllIssueTypes, getAllSeverities} from "../../services/enumService";
import {formatEnum} from "../../components/utils";
import {addIssue} from "../../services/issueService";

const getProjectParticipants = (project) => {
    if (project === null || project === undefined) {
        return [];
    }

    return project.involvements.map(involvement => involvement.user)
}

const AddIssue = (properties) => {
    const credentials = properties.credentials === undefined ?
        properties.location.state.credentials : properties.credentials;

    const [formValues, setFormValues] = useState({
        project: properties.location.state ? properties.location.state.project : undefined,
        title: "",
        description: "",
        severity: null,
        type: null,
        expectedBehaviour: "",
        actualBehaviour: "",
        stackTrace: "",
        assignee: undefined,
        reporterId: credentials.user.id
    });

    const setAlert = properties.setAlert;

    console.log(formValues);

    const [severities, setSeverities] = useState([]);

    const [issueTypes, setIssueTypes] = useState([]);

    let history = useHistory();

    useEffect(() => {
        if (credentials.jwt !== "") {
            getAllIssueTypes(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setIssueTypes(response.data);
                    } else {
                        history.push(errorPage);
                    }
                });
            getAllSeverities(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setSeverities(response.data);
                    } else {
                        history.push(errorPage);
                    }
                })
        }
    }, [credentials, history]);

    if (credentials.jwt === "") {
        return <Redirect to={errorPage}/>;
    }

    const handleClick = () => {
        try {
            // prepare the data
            let data = {...formValues};
            data.projectId = data.project.id;
            if (data.assignee !== null && data.assignee !== undefined) {
                data.assigneeId = data.assignee.id;
            }

            delete data.project;
            delete data.assignee;

            console.log(data);

            addIssue(credentials.jwt, data)
                .then(response => {
                    console.log(response);
                    setAlert({
                        state: true,
                        severity: response[responseTypes.key],
                        message: response[responseTypes.key] === responseTypes.success ?
                            "Issue created successfully" : response.data,
                        backgroundColor: "inherit"
                    })
                });
        } catch (error) {
            setAlert({
                state: true,
                severity: "error",
                message: "All fields must be supplied",
                backgroundColor: "inherit"
            });
        }
    };

    const content = (
        <Box>
            <p className={"action-title"}>Add a new issue</p>
            <MyComboBox
                className={"combo-box-filled-label"}
                getOptionLabel={option => option.title}
                label={"Project"}
                defaultValue={properties.location.state ? properties.location.state.project : undefined}
                options={[properties.location.state.project]}  // todo fill the options with the user's projects
                onChange={(event, value) => setFormValues((prev) => ({...prev, project: value}))}
            />
            <LabeledField
                text={"Title"}
                name={"title"}
                type={"input"}
                onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
            />
            <LabeledField
                text={"Description"}
                name={"description"}
                type={"input"}
                onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
            />
            <MyComboBox
                getOptionLabel={option => formatEnum(option)}
                label={"Severity"}
                className={"combo-box-filled-label combo-box-add-issue-enum"}
                options={severities}
                onChange={(event, value) => setFormValues((prev) => ({...prev, severity: value}))}
            />
            <MyComboBox
                getOptionLabel={option => formatEnum(option)}
                label={"Type"}
                className={"combo-box-filled-label combo-box-add-issue-enum"}
                options={issueTypes}
                onChange={(event, value) =>
                    setFormValues((prev) => ({
                        ...prev,
                        type: value,
                        expectedBehaviour: value !== "BUG" && "",
                        actualBehaviour: value !== "BUG" && "",
                        stackTrace: value !== "BUG" && ""
                    }))
                }
            />
            {
                formValues.type === "BUG"
                &&
                <LabeledField
                    text={"Expected Behaviour"}
                    name={"expectedBehaviour"}
                    type={"input"}
                    onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
                />
            }
            {
                formValues.type === "BUG"
                &&
                <LabeledField
                    text={"Actual Behaviour"}
                    name={"actualBehaviour"}
                    type={"input"}
                    onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
                />
            }
            {
                formValues.type === "BUG"
                &&
                <LabeledField
                    text={"Stack Trace"}
                    name={"stackTrace"}
                    type={"input"}
                    onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
                />
            }
            <MyComboBox
                getOptionLabel={option => option.username}
                label={"Assignee"}
                className={"combo-box-filled-label combo-box-add-issue-enum"}
                options={getProjectParticipants(formValues.project)}
                onChange={(event, value) => setFormValues((prev) => ({...prev, assignee: value}))}
            />
            <Button
                variant={"contained"}
                className={"action-button"}
                onClick={handleClick}
            >
                Add issue
            </Button>
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>;
};

const AddIssuePage = withRouter(AddIssue);

export default AddIssuePage;