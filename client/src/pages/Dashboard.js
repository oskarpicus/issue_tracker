import {Redirect} from "react-router-dom";
import {errorPage} from "../components/const";

const Dashboard = ({credentials}) => {
    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    return (
        <p>Hello {credentials.user.firstName} {credentials.user.lastName}</p>
    )
};

export default Dashboard
