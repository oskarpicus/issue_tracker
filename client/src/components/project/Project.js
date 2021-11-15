import {Box} from "@mui/material";
import {Link} from "react-router-dom";
import './project.css';
import {viewSingleProjectPage} from "../const";

const formatProjectRole = (role) => {
    return role.replaceAll("_", " ");
}

const Project = ({involvement}) => {
    return (
        <Link to={viewSingleProjectPage.replaceAll(":id", involvement.project.id)} className={"project"}>
            <Box className={"project-information"}>
                <p>{involvement.project.title}</p>
                <p>{formatProjectRole(involvement.role)}</p>
            </Box>
            <p className={"project-description"}>{involvement.project.description}</p>
        </Link>
    )
};

export default Project;
