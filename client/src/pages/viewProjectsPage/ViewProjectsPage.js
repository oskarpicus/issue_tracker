import {Redirect, useHistory} from "react-router-dom";
import {addProjectPage, errorPage, responseTypes} from "../../const";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";
import {viewProjects} from "../../services/projectService";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import Menu from "../../components/menu/Menu";
import Project from "../../components/project/Project";
import {Box, Button} from "@mui/material";
import './viewProjectsPage.css';
import {getUser} from "../../services/userService";

const getFullName = (userDetails) => {
    return `${userDetails.firstName} ${userDetails.lastName}`;
}

const ViewProjects = ({match, credentials}) => {
    const [involvements, setInvolvements] = useState([]);

    const [userDetails, setUserDetails] = useState({});

    const history = useHistory();

    useEffect(() => {
        const getInvolvements = () => {
            viewProjects(match.params.username, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setInvolvements(response.data);
                    } else {
                        // todo possible handle errors
                        history.push(errorPage);
                    }
                });
        };
        if (credentials.user !== undefined) {
            getInvolvements();
        }
    }, [match, credentials, history]);

    useEffect(() => {
        const getUserDetails = () => {
            getUser(match.params.username, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setUserDetails(response.data);
                    } else {
                        history.push(errorPage);
                    }
                })
        }
        getUserDetails();
    }, [match, credentials, history]);

    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    const handleClick = () => {
        history.push({
            pathname: addProjectPage,
            state: {
                credentials: credentials
            }
        });
    }

    const content = (
        <Box id={"view-projects-page"}>
            <Box className={"title-button-inline"}>
                <p className={"action-title"} id={"p-username-projects"}>{getFullName(userDetails)}'s projects</p>
                <Button variant={"contained"} className={"action-button"} id={"add-project-button"} onClick={handleClick}>Add project</Button>
            </Box>
            <List>
                {
                    involvements.map(involvement => (
                        <ListItem key={`involvement_${involvement.id}`}>
                            <Project involvement={involvement}/>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    return <Menu content={content} credentials={credentials}/>
};

const ViewProjectsPage = withRouter(ViewProjects)

export default ViewProjectsPage;
