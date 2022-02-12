import './participantDetails.css';
import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import {viewProjectsPage} from "../../const";
import {formatEnum} from '../utils';

const ParticipantDetails = ({involvement}) => {
    return (
        <Box className={"participant-details"}>
            <Link to={viewProjectsPage.replace(":username", involvement.user.username)}>
                <p>{`${involvement.user.firstName} ${involvement.user.lastName}`}</p>
            </Link>
            <p>{formatEnum(involvement.role)}</p>
        </Box>
    );
};

export default ParticipantDetails;
