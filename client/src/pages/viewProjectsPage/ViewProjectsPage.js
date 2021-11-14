import {Redirect, useHistory} from "react-router-dom";
import {errorPage, responseTypes} from "../../components/const";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";
import {viewProjects} from "../../services/projectService";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import Menu from "../../components/menu/Menu";
import Project from "../../components/project/Project";
import {Box, Button} from "@mui/material";
import './viewProjectsPage.css';

const getFullName = (credentials) => {
    return `${credentials.user.firstName} ${credentials.user.lastName}`;
}

const ViewProjects = ({match, credentials}) => {
    const [involvements, setInvolvements] = useState([]);

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
        getInvolvements();
    }, [match, credentials, history]);

    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    const handleClick = () => {
        // todo redirect to add project page
        history.push("/");
    }

    const content = (
        <Box id={"view-projects-page"}>
            <Box className={"title-button-inline"}>
                <p className={"action-title"} id={"p-username-projects"}>{getFullName(credentials)}'s projects</p>
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

    return <Menu content={content}/>
};

const ViewProjectsPage = withRouter(ViewProjects)

export default ViewProjectsPage;
