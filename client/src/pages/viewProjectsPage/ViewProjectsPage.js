import {Redirect} from "react-router-dom";
import {errorPage} from "../../components/const";
import {withRouter} from "react-router-dom/cjs/react-router-dom";

const ViewProjects = ({match, credentials}) => {
    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    return (
        <div>You are {match.params.username}</div>
    )
};

const ViewProjectsPage = withRouter(ViewProjects)

export default ViewProjectsPage;
