import './addIssueModal.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {formatEnum, getIssueIcon} from "../utils";
import {useEffect, useState} from "react";
import {getSuggestedSeverity, getSuggestedType} from "../../services/aiService";
import {responseTypes} from "../../const";
import {addIssue} from "../../services/issueService";

const data = {
    "SEVERE": {color: "#D32F2F", suggested: ["Critical", "Blocker"]},
    "NON_SEVERE": {color: "#526F50", suggested: ["Trivial", "Minor"]}
};

const getSuggestedSeverityMessage = (suggestedSeverity) => {
    let suggested = data[suggestedSeverity].suggested.reduce((x, y) => x + " & " + y)
    return (
        <span style={{display: "block", marginBottom: "1vh"}}>
            This issue is&nbsp;
            <span style={{color: data[suggestedSeverity].color}}>{formatEnum(suggestedSeverity)}</span>.
            &nbsp;
            {suggested} might be best suited.
        </span>
    );
};

const getSuggestedTypeMessage = (suggestedType) => {
  return (
    <span style={{display: "flex", marginBottom: "1vh", alignItems: "center"}}>
        We think that this issue is a&nbsp;
        <span className={"container-icon-text"}>
            {getIssueIcon({"type": suggestedType})}
            &nbsp;
            {suggestedType}.
        </span>
    </span>
  );
};

const saveIssue = (issue, credentials, setAlert) => {
    try {
        // prepare the data
        let data = {...issue};
        data.projectId = data.project.id;
        if (data.assignee !== null && data.assignee !== undefined) {
            data.assigneeId = data.assignee.id;
        }

        delete data.project;
        delete data.assignee;

        addIssue(credentials.jwt, data)
            .then(response => {
                setAlert({
                    state: true,
                    severity: response[responseTypes.key],
                    message: response[responseTypes.key] === responseTypes.success ?
                        "Issue created successfully" : response.data,
                    backgroundColor: "inherit"
                });
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

const isSeverityChosen = (issue) => issue.severity !== null && issue.severity !== undefined;

const isIssueTypeChosen = (issue) => issue.type !== null && issue.type !== undefined;

const isDataCompleted = (issue) => isSeverityChosen(issue) && isIssueTypeChosen(issue);

const severityLevelMatches = (issue, suggestedSeverity) => {
    debugger;
    const x = data[suggestedSeverity].suggested.find((severity) => severity.toUpperCase() === issue.severity) !== undefined;
    return x;
};

const issueTypeMatches = (issue, suggestedType) => {
    debugger;
    const x = issue.type === suggestedType;
    return x;
}

const predictionsMatch = (issue, suggestedSeverity, suggestedType) => {
    debugger;
    return severityLevelMatches(issue, suggestedSeverity) && issueTypeMatches(issue, suggestedType);
};


export const AddIssueModal = ({open, setOpen, credentials, issue, setAlert}) => {
    const [suggestedSeverity, setSuggestedSeverity] = useState("NON_SEVERE");
    const [suggestedIssueType, setSuggestedIssueType] = useState("BUG");

    useEffect(() => {
        getSuggestedSeverity(credentials.jwt, issue.title)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.success) {
                    let result = response.data;
                    setSuggestedSeverity(result);
                }
            });
    }, [credentials, issue]);

    useEffect(() => {
        getSuggestedType(credentials.jwt, issue.title)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.success) {
                    setSuggestedIssueType(response.data);
                }
            });
    }, [credentials, issue]);

    useEffect(() => {
        if (predictionsMatch(issue, suggestedSeverity, suggestedIssueType)) {
            // no need for modal, severities match, perform the save
            if (open) {
                saveIssue(issue, credentials, setAlert);
            }
            setOpen(false);
        }
    }, [issue, credentials, setAlert, setOpen, suggestedSeverity, suggestedIssueType, open]);

    const handleNo = () => setOpen(false);

    const handleYes = () => {
        // perform the save
        saveIssue(issue, credentials, setAlert);
        setOpen(false);
    };

    if (predictionsMatch(issue, suggestedSeverity, suggestedIssueType)) {
        return <span/>;
    }

    return (
        <Dialog open={open}>
            <DialogTitle className={"dialog-title-add-issue"}>Add issue</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {!severityLevelMatches(issue, suggestedSeverity) && getSuggestedSeverityMessage(suggestedSeverity)}
                    {!issueTypeMatches(issue, suggestedIssueType) && getSuggestedTypeMessage(suggestedIssueType)}
                    {
                        isDataCompleted(issue)
                            ?
                            `Are you sure that you want to save this issue as it is ?`
                            :
                            "But you need to complete the form first !"
                    }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    className={"action-button"}
                    onClick={handleNo}
                >
                    {
                        isDataCompleted(issue)
                            ?
                            "No"
                            :
                            "Back"
                    }
                </Button>
                {
                    isDataCompleted(issue)
                    &&
                    <Button
                        variant={"contained"}
                        className={"action-button"}
                        onClick={handleYes}
                    >
                        Yes
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
};