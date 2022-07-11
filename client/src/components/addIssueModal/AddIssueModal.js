import './addIssueModal.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {formatEnum, getIssueIcon} from "../utils";
import {useEffect, useState} from "react";
import {getSuggestedSeverity, getSuggestedType} from "../../services/aiService";
import {responseTypes, viewDuplicateIssues} from "../../const";
import {useHistory} from "react-router-dom";

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
        <span/>
    );
    // TODO uncomment as a result of Task/#133
  // return (
  //   <span style={{display: "flex", marginBottom: "1vh", alignItems: "center"}}>
  //       We think that this issue is a&nbsp;
  //       <span className={"container-icon-text"}>
  //           {getIssueIcon({"type": suggestedType})}
  //           &nbsp;
  //           {suggestedType}.
  //       </span>
  //   </span>
  // );
};

const redirectToViewDuplicates = (issue, history) => {
    history.push({
        pathname: viewDuplicateIssues,
        state: {
            issue: issue
        }
    });
};

const isSeverityChosen = (issue) => issue.severity !== null && issue.severity !== undefined;

const isIssueTypeChosen = (issue) => issue.type !== null && issue.type !== undefined;

const isDataCompleted = (issue) => isSeverityChosen(issue) && isIssueTypeChosen(issue);

const severityLevelMatches = (issue, suggestedSeverity) => {
    return data[suggestedSeverity].suggested.find((severity) => severity.toUpperCase() === issue.severity) !== undefined;
};

const issueTypeMatches = (issue, suggestedType) => {
    return issue.type === suggestedType;
}

const predictionsMatch = (issue, suggestedSeverity, suggestedType) => {
    return severityLevelMatches(issue, suggestedSeverity) && issueTypeMatches(issue, suggestedType);
};


export const AddIssueModal = ({open, setOpen, credentials, issue, setAlert}) => {
    const [suggestedSeverity, setSuggestedSeverity] = useState("NON_SEVERE");
    const [suggestedIssueType, setSuggestedIssueType] = useState("BUG");
    const history = useHistory();

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
                redirectToViewDuplicates(issue, history);
            }
            setOpen(false);
        }
    }, [issue, setOpen, suggestedSeverity, suggestedIssueType, open, history]);

    const handleNo = () => setOpen(false);

    const handleYes = () => {
        // perform the save
        redirectToViewDuplicates(issue, history);
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