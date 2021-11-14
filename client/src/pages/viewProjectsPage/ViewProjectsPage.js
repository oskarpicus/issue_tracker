import {Redirect, useHistory} from "react-router-dom";
import {errorPage, responseTypes} from "../../components/const";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {useEffect, useState} from "react";
import {viewProjects} from "../../services/projectService";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import {ListItemText} from "@mui/material";
import Menu from "../../components/menu/Menu";

const ViewProjects = ({match, credentials}) => {
    const [involvements, setInvolvements] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const getInvolvements = () => {
            viewProjects(match.params.username, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setInvolvements(response.data);
                        console.log(response);
                    } else {
                        // todo possible handle errors
                        console.log(response);
                        history.push(errorPage);
                    }
                });
        };
        getInvolvements();
    }, [match, credentials]);

    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    const content = <div>
        You are {match.params.username}
        <List>
            {
                involvements.map(involvement => (
                    <ListItem key={involvement.id} >
                        <ListItemText secondary={involvement.role} primary={involvement.project.title}/>
                    </ListItem>
                ))
            }
        </List>
    </div>;

    return <Menu content={content}/>
};

const ViewProjectsPage = withRouter(ViewProjects)

export default ViewProjectsPage;
