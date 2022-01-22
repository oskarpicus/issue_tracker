import './addIssueModal.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {formatEnum} from "../utils";
import {useEffect, useState} from "react";
import {getSuggestedSeverity} from "../../services/aiService";
import {responseTypes} from "../const";
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

export const AddIssueModal = ({open, setOpen, credentials, issue, setAlert}) => {
    const [suggestedSeverity, setSuggestedSeverity] = useState("NON_SEVERE");

    useEffect(() => {
        getSuggestedSeverity(credentials.jwt, issue.title)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.success) {
                    let result = response.data;
                    setSuggestedSeverity(result);
                }
            });
    }, [credentials, issue]);

    const handleNo = () => setOpen(false);

    const handleYes = () => {
        // perform the save
        saveIssue(issue, credentials, setAlert);
        setOpen(false);
    };

    if (data[suggestedSeverity].suggested.find((severity) => severity.toUpperCase() === issue.severity) !== undefined) {
        // no need for modal, severities match, perform the save
        if (open) {
            saveIssue(issue, credentials, setAlert);
        }
        setOpen(false);
        return <span/>;
    }

    return (
        <Dialog open={open}>
            <DialogTitle className={"dialog-title-add-issue"}>Add issue</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {getSuggestedSeverityMessage(suggestedSeverity)}
                    {
                        isSeverityChosen(issue)
                            ?
                            `Are you sure that this issue should be classified as ${issue.severity} ?`
                            :
                            "But you need to select a severity level first !"
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
                        isSeverityChosen(issue)
                            ?
                            "No"
                            :
                            "Back"
                    }
                </Button>
                {
                    isSeverityChosen(issue)
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