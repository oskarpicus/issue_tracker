import {Redirect, useHistory, withRouter} from "react-router-dom";
import './viewAssignedIssuesPage.css';
import {errorPage, responseTypes} from "../../const";
import {useEffect, useState} from "react";
import {getAssignedIssues} from "../../services/issueService";
import {Box, List, ListItem} from "@mui/material";
import Menu from "../../components/menu/Menu";
import Issue from "../../components/issue/Issue";

const ViewAssignedIssues = ({credentials, match}) => {
    const [issues, setIssues] = useState([]);

    let history = useHistory();

    useEffect(() => {
        if (credentials.user !== undefined) {
            getAssignedIssues(credentials.jwt, match.params.username)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        delete response[responseTypes.key];
                        setIssues(response);
                    } else {
                        history.push(errorPage);
                    }
                });
        }
    }, [credentials, match.params.username, history]);

    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    const content = (
        <Box id={"view-assigned-issues-page"}>
            <p className={"action-title"}>{match.params.username}'s assigned issues</p>
            {
                issues.length === 0
                &&
                <p id={"p-no-issues-to-display"}>There are no issues to display</p>
            }
            <List>
                {
                    issues.map(issue => (
                        <ListItem key={`issue_view_assigned_${issue.id}`}>
                            <Issue issue={issue}/>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>
}

const ViewAssignedIssuesPage = withRouter(ViewAssignedIssues);

export default ViewAssignedIssuesPage;
