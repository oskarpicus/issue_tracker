import './viewIssuePage.css';
import {withRouter} from "react-router-dom";

const ViewIssue = ({match, credentials, setAlert}) => {
    return (
        <div>{JSON.stringify(match)}</div>
    )
};

const ViewIssuePage = withRouter(ViewIssue);

export default ViewIssuePage;
