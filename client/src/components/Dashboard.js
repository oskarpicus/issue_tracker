import {Redirect} from "react-router-dom";
import {errorPage} from "./const";

const Dashboard = ({credentials}) => {
    if (credentials.user === undefined) {
        return <Redirect to={errorPage}/>
    }

    // let request = new XMLHttpRequest();
    // request.onreadystatechange = function () {
    //     if (request.readyState === 4) {
    //         console.log(request.status)
    //         console.log(request.responseText)
    //     }
    // };
    // request.open("GET", "http://localhost:8080/hello")
    // request.setRequestHeader("Authorization", "Bearer " + credentials.jwt)
    // request.setRequestHeader("Content-Type", "application/json")
    // request.send()

    return (
        <p>Hello {credentials.user.firstName} {credentials.user.lastName}</p>
    )
};

export default Dashboard
