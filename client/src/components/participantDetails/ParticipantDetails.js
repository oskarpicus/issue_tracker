import './participantDetails.css';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {viewProjectsPage} from "../const";

const formatProjectRole = (role) => {
    return role.replaceAll("_", " ");
}

const ParticipantDetails = ({involvement}) => {
    return (
        <Box className={"participant-details"}>
            <Link to={viewProjectsPage.replace(":username", involvement.user.username)}>
                <p>{`${involvement.user.firstName} ${involvement.user.lastName}`}</p>
            </Link>
            <p>{formatProjectRole(involvement.role)}</p>
        </Box>
    );
};

export default ParticipantDetails;
