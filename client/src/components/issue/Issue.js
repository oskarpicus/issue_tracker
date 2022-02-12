import {Box, Tooltip} from "@mui/material";
import './issue.css';
import {formatEnum, getIssueIcon} from "../utils";
import {Link} from "react-router-dom";
import {viewIssuePage} from "../../const";

const Issue = ({issue}) => {
    return (
        <Link to={viewIssuePage.replaceAll(":id", issue.id)} className={"issue-details"}>
            <Box>
                <Box className={"issue-title-flex"}>
                    <Tooltip title={issue.type}>
                        {getIssueIcon(issue)}
                    </Tooltip>
                    <p>{issue.title}</p>
                    <p>{formatEnum(issue.status)}</p>
                </Box>
                <p className={"issue-description"}>{issue.description}</p>
            </Box>
        </Link>
    );
};

export default Issue;