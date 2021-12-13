import BugReportIcon from "@mui/icons-material/BugReportOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HelpIcon from "@mui/icons-material/Help";
import ClearIcon from "@mui/icons-material/Clear";
import DeviceUnknownIcon from "@mui/icons-material/DeviceUnknown";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

export const formatEnum = (text) => {
    return text.replaceAll("_", " ");
};

export const getIssueIcon = (issue) => {
    const bugColorBySeverity = {
        "TRIVIAL": "#00ac46",
        "MINOR": "#fdc500",
        "MAJOR": "#fd8c00",
        "CRITICAL": "#dc0000",
        "BLOCKER": "#780000"
    };

    const iconsByIssueType = {
        "BUG": <BugReportIcon fontSize={"large"} htmlColor={bugColorBySeverity[issue.severity]}/>,
        "DOCUMENTATION": <DescriptionIcon fontSize={"large"} htmlColor={"black"}/>,
        "DUPLICATE": <ContentCopyIcon fontSize={"large"} htmlColor={"black"}/>,
        "ENHANCEMENT": <AddBoxIcon fontSize={"large"} htmlColor={"black"}/>,
        "HELP_WANTED": <HelpIcon fontSize={"large"} htmlColor={"black"}/>,
        "INVALID": <ClearIcon fontSize={"large"} htmlColor={"black"}/>,
        "QUESTION": <DeviceUnknownIcon fontSize={"large"} htmlColor={"black"}/>,
        "WONT_FIX": <DoNotDisturbIcon fontSize={"large"} htmlColor={"black"}/>
    };

    return iconsByIssueType[issue.type];
};
