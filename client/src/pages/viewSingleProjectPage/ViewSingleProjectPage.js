import './viewSingleProjectPage.css';
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import Menu from "../../components/menu/Menu";
import {useEffect, useState} from "react";
import {viewSingleProject} from "../../services/projectService";
import {Redirect, useHistory} from "react-router-dom";
import {errorPage, responseTypes} from "../../components/const";
import {Box, Button, List, ListItem} from "@mui/material";
import ParticipantDetails from "../../components/participantDetails/ParticipantDetails";
import AddParticipantModal from "../../components/addParticipantModal/AddParticipantModal";

const isParticipant = (project, user) => {
    return project.involvements
        .find(involvement => involvement.user.username === user.username) !== undefined;
}

const ViewProjectPage = ({match, credentials, setAlert}) => {
    const [project, setProject] = useState({
        title: "",
        description: "",
        involvements: []
    });

    const [openModal, setOpenModal] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const getData = () => {
            viewSingleProject(match.params.id, credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setProject(response.data);
                    } else {
                        history.push(errorPage);
                    }
                })
        };

        if (credentials.user !== undefined) {
            getData();
        }
    }, [credentials, history, match]);

    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    const handleClick = () => setOpenModal(true);

    const isCurrentUserParticipant = isParticipant(project, credentials.user);

    let content = (
        <Box id={"view-single-projects-page"}>
            <p className={"action-title"}>{project.title}</p>
            <p
                className={"project-description"}
                id={"project-description-view-single-project-page"}
            >
                {project.description}
            </p>
            <p className={"label-sub-content"}>Participants</p>
            <List>
                {
                    project.involvements.map(involvement => (
                        <ListItem key={`participant_${involvement.id}`}>
                            <ParticipantDetails involvement={involvement}/>
                        </ListItem>
                    ))
                }
            </List>
            {
                isCurrentUserParticipant
                &&
                    <Button
                        variant={"contained"}
                        className={"action-button"}
                        id={"button-add-participant"}
                        onClick={handleClick}
                        >
                        Add Participant
                    </Button>
            }
            {
                isCurrentUserParticipant
                &&
                    <AddParticipantModal
                        credentials={credentials}
                        open={openModal}
                        setOpen={setOpenModal}
                        project={project}
                        setAlert={setAlert}
                    />
            }
        </Box>
    );

    return (
        <Menu content={content} credentials={credentials}/>
    )
};

const ViewSingleProjectPage = withRouter(ViewProjectPage);

export default ViewSingleProjectPage;
