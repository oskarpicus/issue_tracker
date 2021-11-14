import {Box} from "@mui/material";
import './project.css';

const formatProjectRole = (role) => {
    return role.replaceAll("_", " ");
}

const Project = ({involvement}) => {
    return (
        <Box className={"project"}>
            <Box className={"project-information"}>
                <p>{involvement.project.title}</p>
                <p>{formatProjectRole(involvement.role)}</p>
            </Box>
            <p className={"project-description"}>{involvement.project.description}</p>
        </Box>
    )
};

export default Project;
