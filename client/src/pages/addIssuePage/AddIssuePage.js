import {Redirect, useHistory, withRouter} from "react-router-dom";
import './AddIssuePage.css';
import {errorPage, responseTypes} from "../../const";
import {useEffect, useState} from "react";
import {Box, Button} from "@mui/material";
import Menu from "../../components/menu/Menu";
import MyComboBox from "../../components/myComboBox/MyComboBox";
import LabeledField from "../../components/labeledField/LabeledField";
import {getAllIssueTypes, getAllSeverities} from "../../services/enumService";
import {formatEnum} from "../../components/utils";
import LabeledTextArea from "../../components/labeledTextArea/LabeledTextArea";
import {viewSingleProject} from "../../services/projectService";
import DefaultLabeledField from "../../components/labeledField/DefaultLabeledField";
import {AddIssueModal} from "../../components/addIssueModal/AddIssueModal";

const getProjectParticipants = (project) => {
    if (project === null || project === undefined) {
        return [];
    }

    return project.involvements.map(involvement => involvement.user)
}

const AddIssue = ({match, credentials, setAlert}) => {
    const [formValues, setFormValues] = useState({
        project: undefined,
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

    const [severities, setSeverities] = useState([]);

    const [issueTypes, setIssueTypes] = useState([]);

    const [openModal, setOpenModal] = useState(false);

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
                });
            viewSingleProject(match.params.id, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setFormValues((prev) => ({...prev, project: response.data}));
                    } else {
                        history.push(errorPage);
                    }
                });
        }
    }, [credentials, history, match.params.id]);

    if (credentials.jwt === "") {
        return <Redirect to={errorPage}/>;
    }

    const handleClick = () => setOpenModal(true);

    const content = (
        <Box>
            <p className={"action-title"}>Add a new issue</p>
            <DefaultLabeledField
                text={"Project"}
                name={"project"}
                type={"text"}
                readOnly={true}
                value={formValues.project === undefined ? "" : formValues.project.title}
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
                        expectedBehaviour: value !== "BUG" ? "" : prev.expectedBehaviour,
                        actualBehaviour: value !== "BUG" ? "" : prev.actualBehaviour,
                        stackTrace: value !== "BUG" ? "" : prev.stackTrace
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
                <LabeledTextArea
                    text={"Stack Trace"}
                    name={"stackTrace"}
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
            <AddIssueModal
                open={openModal}
                setOpen={setOpenModal}
                credentials={credentials}
                issue={formValues}
                setAlert={setAlert}
            />
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>;
};

const AddIssuePage = withRouter(AddIssue);

export default AddIssuePage;