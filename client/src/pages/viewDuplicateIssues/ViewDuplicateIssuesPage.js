import {useHistory, withRouter} from "react-router-dom";
import {useEffect, useState} from "react";
import {addIssue, retrieveDuplicateIssues} from "../../services/issueService";
import {responseTypes} from "../../const";
import Menu from "../../components/menu/Menu";
import {Box, Button, List, ListItem} from "@mui/material";
import Issue from "../../components/issue/Issue";
import './viewDuplicateIssuesPage.css';

const prepareData = (issue) => {
    let data = {...issue};
    data.id = 0;
    data.projectId = data.project.id;
    if (data.assignee !== null && data.assignee !== undefined) {
        data.assigneeId = data.assignee.id;
    }

    delete data.project;
    delete data.assignee;

    return data;
}

const saveIssue = (issue, credentials, setAlert, history) => {
    history.goBack();
    try {
        // prepare the data
        let data = prepareData(issue);

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

const ViewDuplicateIssues = ({credentials, location, setAlert}) => {
    const issue = location.state.issue;
    const [duplicates, setDuplicates] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const data = prepareData(issue);

        retrieveDuplicateIssues(credentials.jwt, data)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.success) {
                    // there is nothing to recommend
                    if (response.data.length === 0) {
                        saveIssue(issue, credentials, setAlert, history);
                    }

                    setDuplicates(response.data);
                }
            });
    }, [credentials, issue, setAlert, history]);

    const content = (
        <Box id={"box-view-duplicate-issues-page"}>
            <p className={"action-title"}>Possible duplicate issues</p>
            <p className={"sub-title"}>We think that these issues might be duplicates of what you're trying to add</p>
            <List>
                {
                    duplicates.map(duplicateIssue => (
                       <ListItem key={`duplicate_issue_${duplicateIssue.id}`}>
                           <Issue issue={duplicateIssue}/>
                       </ListItem>
                    ))
                }
            </List>
            <Button
                variant={"contained"}
                className={"action-button"}
                id={"action-button-view-duplicate-issues-page"}
                onClick={() => saveIssue(issue, credentials, setAlert, history)}
            >
                Continue to add issue
            </Button>
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>;
};

const ViewDuplicateIssuesPage = withRouter(ViewDuplicateIssues);

export default ViewDuplicateIssuesPage;
