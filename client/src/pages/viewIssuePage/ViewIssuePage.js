import './viewIssuePage.css';
import {useHistory, withRouter} from "react-router-dom";
import Menu from "../../components/menu/Menu";
import {useEffect, useState} from "react";
import {deleteIssue, getIssueById, updateIssue} from "../../services/issueService";
import {errorPage, responseTypes, viewAssignedIssuesPage} from "../../const";
import {Box, Button} from "@mui/material";
import {formatEnum, getIssueIcon} from "../../components/utils";
import DefaultLabeledField from "../../components/labeledField/DefaultLabeledField";
import {getAllIssueTypes, getAllSeverities, getAllStatuses} from "../../services/enumService";
import MyComboBox from "../../components/myComboBox/MyComboBox";
import DefaultLabeledTextArea from "../../components/labeledTextArea/DefaultLabeledTextArea";
import {viewSingleProject} from "../../services/projectService";

const ViewIssue = ({match, credentials, setAlert}) => {
    const [issue, setIssue] = useState({
        id: 0,
        project: {
            id: 0,
            title: ""
        },
        title: "",
        description: "",
        severity: undefined,
        type: undefined,
        expectedBehaviour: "",
        actualBehaviour: "",
        stackTrace: "",
        reporter: {
            id: 0,
            username: ""
        },
        assignee: null,
        status: undefined
    });

    const [severities, setSeverities] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [issueTypes, setIssueTypes] = useState([]);
    const [possibleAssignees, setPossibleAssignees] = useState([]);

    const history = useHistory();

    useEffect(() => {
        if (credentials.user !== undefined) {
            getIssueById(credentials.jwt, match.params.id)
                .then(response => {
                    if (response[responseTypes.keyFallback] === responseTypes.success) {
                        setIssue(response);
                    } else {
                        history.push(errorPage);
                    }
                });
        }
    }, [credentials, match, history]);

    useEffect(() => {
        if (credentials.jwt !== "") {
            getAllSeverities(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setSeverities(response.data);
                    } else {
                        history.push(errorPage);
                    }
                });
            getAllIssueTypes(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setIssueTypes(response.data);
                    } else {
                        history.push(errorPage);
                    }
                });
            getAllStatuses(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setStatuses(response.data);
                    } else {
                        history.push(errorPage);
                    }
                })
        }
    }, [credentials, history]);

    useEffect(() => {
        if (credentials.user !== undefined && issue.project.id !== 0) {
            viewSingleProject(issue.project.id, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setPossibleAssignees(response.data.involvements.map(involvement => involvement.user));
                    } else {
                        history.push(errorPage);
                    }
                });
        }
    }, [credentials, issue.project.id, history]);

    const handleDeleteButtonClicked = () => {
        deleteIssue(credentials.jwt, issue.id)
            .then(response => {
                if (response[responseTypes.keyFallback] === responseTypes.success) {
                    history.push(viewAssignedIssuesPage.replaceAll(":username", credentials.user.username));
                }

                setAlert({
                    state: true,
                    severity: response[responseTypes.keyFallback],
                    message: response[responseTypes.keyFallback] === responseTypes.success ? "Deleted issue successfully" : response.data,
                    backgroundColor: "inherit"
                });
            })
    }

    const handleUpdateButtonClicked = () => {
        // prepare the data
        let data = {...issue};
        data.projectId = data.project.id;
        data.reporterId = data.reporter.id;
        if (data.assignee !== null && data.assignee !== undefined) {
            data.assigneeId = data.assignee.id;
        }

        delete data.project;
        delete data.assignee;

        updateIssue(credentials.jwt, data)
            .then(response => {
                // todo remove the re-rendering of the page - fix check boxes with state
                history.go(0);
                setAlert({
                    state: true,
                    severity: response[responseTypes.keyFallback],
                    message: response[responseTypes.keyFallback] === responseTypes.success ? "Updated issue successfully" : response.data,
                    backgroundColor: "inherit"
                });
            })
    }

    const isParticipant = possibleAssignees.find(user => user.id === credentials.user.id) !== undefined;

    const content = (
        <Box className={"view-issue-page"}>
            <Box className={"view-issue-page-header"}>
                {getIssueIcon(issue)}
                <p className={"action-title"}>{issue.title}</p>
                {
                    isParticipant
                    &&
                    <Button
                        className={"action-button delete-issue-button"}
                        variant={"contained"}
                        onClick={handleDeleteButtonClicked}
                    >
                        Delete
                    </Button>
                }
            </Box>
            <DefaultLabeledField
                text={"Project"}
                name={"project"}
                value={issue.project.title}
                readOnly={true}
                type={"text"}
            />
            <DefaultLabeledField
                text={"Reporter"}
                name={"reporter"}
                value={issue.reporter.username}
                readOnly={true}
                type={"text"}
            />
            <DefaultLabeledField
                text={"Title"}
                name={"title"}
                value={issue.title}
                readOnly={false}
                type={"text"}
                onChange={(name, value) => setIssue(prev => ({...prev, [name]: value}))}
            />
            <DefaultLabeledField
                text={"Description"}
                name={"description"}
                value={issue.description}
                readOnly={false}
                type={"text"}
                onChange={(name, value) => setIssue(prev => ({...prev, [name]: value}))}
            />
            {
                issue.status !== undefined
                &&
                <MyComboBox
                    className={"combo-box-filled-label combo-box-add-issue-enum"}
                    getOptionLabel={option => formatEnum(option)}
                    options={statuses}
                    label={"Status"}
                    defaultValue={issue.status}
                    onChange={(event, value) => setIssue((prev) => ({...prev, status: value}))}
                />
            }
            {
                issue.severity !== undefined
                &&
                <MyComboBox
                    className={"combo-box-filled-label combo-box-add-issue-enum"}
                    getOptionLabel={option => formatEnum(option)}
                    options={severities}
                    label={"Severity"}
                    defaultValue={issue.severity}
                    onChange={(event, value) => setIssue((prev) => ({...prev, severity: value}))}
                />
            }
            {
                issue.type !== undefined
                &&
                <MyComboBox
                    className={"combo-box-filled-label combo-box-add-issue-enum"}
                    getOptionLabel={option => formatEnum(option)}
                    options={issueTypes}
                    label={"Type"}
                    defaultValue={issue.type}
                    onChange={(event, value) => setIssue((prev) => ({...prev, type: value}))}
                />
            }
            {
                issue.type === "BUG"
                &&
                <DefaultLabeledField
                    text={"Expected Behaviour"}
                    name={"expectedBehaviour"}
                    value={issue.expectedBehaviour}
                    readOnly={false}
                    type={"text"}
                    onChange={(name, value) => setIssue(prev => ({...prev, [name]: value}))}
                />
            }
            {
                issue.type === "BUG"
                &&
                <DefaultLabeledField
                    text={"Actual Behaviour"}
                    name={"actualBehaviour"}
                    value={issue.actualBehaviour}
                    readOnly={false}
                    type={"text"}
                    onChange={(name, value) => setIssue(prev => ({...prev, [name]: value}))}
                />
            }
            {
                issue.type === "BUG"
                &&
                <DefaultLabeledTextArea
                    text={"Stack Trace"}
                    name={"stackTrace"}
                    value={issue.stackTrace}
                    readOnly={false}
                    onChange={(name, value) => setIssue(prev => ({...prev, [name]: value}))}
                />
            }
            {
                (issue.assignee !== null && possibleAssignees.length !== 0)
                &&
                <MyComboBox
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    defaultValue={issue.assignee}
                    getOptionLabel={option => option.username}
                    label={"Assignee"}
                    className={"combo-box-filled-label combo-box-add-issue-enum"}
                    options={possibleAssignees}
                    onChange={(event, value) => setIssue((prev) => ({...prev, assignee: value}))}
                />
            }
            {
                (issue.assignee === null && possibleAssignees.length !== 0)
                &&
                <MyComboBox
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    getOptionLabel={option => option.username}
                    label={"Assignee"}
                    className={"combo-box-filled-label combo-box-add-issue-enum"}
                    options={possibleAssignees}
                    onChange={(event, value) => setIssue((prev) => ({...prev, assignee: value}))}
                />
            }
            {
                isParticipant
                &&
                <Button
                    variant={"contained"}
                    className={"action-button"}
                    onClick={handleUpdateButtonClicked}
                >
                    Update
                </Button>
            }
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>
};

const ViewIssuePage = withRouter(ViewIssue);

export default ViewIssuePage;
