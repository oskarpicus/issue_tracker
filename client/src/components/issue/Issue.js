import {Box} from "@mui/material";
import './issue.css';
import BugReportIcon from "@mui/icons-material/BugReportOutlined";
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DescriptionIcon from '@mui/icons-material/Description';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HelpIcon from '@mui/icons-material/Help';
import ClearIcon from '@mui/icons-material/Clear';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';

const Issue = ({issue}) => {
    const bugColorBySeverity = {
        "TRIVIAL": "#00ac46",
        "MINOR": "#fdc500",
        "MAJOR": "#fd8c00",
        "CRITICAL": "#dc0000",
        "BLOCKER": "#780000"
    };

    const iconsByIssueType = {
        "BUG": <BugReportIcon fontSize={"large"} htmlColor={bugColorBySeverity[issue.severity]}/>,
        "DOCUMENTATION": <DescriptionIcon fontSize={"large"}/>,
        "DUPLICATE": <ContentCopyIcon fontSize={"large"}/>,
        "ENHANCEMENT": <AddBoxIcon fontSize={"large"}/>,
        "HELP_WANTED": <HelpIcon fontSize={"large"}/>,
        "INVALID": <ClearIcon fontSize={"large"}/>,
        "QUESTION": <DeviceUnknownIcon fontSize={"large"}/>,
        "WONT_FIX": <DoNotDisturbIcon fontSize={"large"}/>
    };

    return (
        <Box className={"issue-details"}>
            <Box className={"issue-title-flex"}>
                {iconsByIssueType[issue.type]}
                <p>{issue.title}</p>
                <p>{issue.status}</p>
            </Box>
            <p className={"issue-description"}>{issue.description}</p>
        </Box>
    );
};

export default Issue;