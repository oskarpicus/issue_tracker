import './addProjectPage.css';
import {useState} from "react";
import {withRouter} from "react-router-dom/cjs/react-router-dom";

const AddProject = (properties) => {
    const credentials = properties.location.state.credentials;

    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        involvements: [
            {
                user: {
                    id: credentials.user.id
                }
            }
        ]
    });

    return (
        <div>Lorem ipsum</div>
    )
};

const AddProjectPage = withRouter(AddProject);

export default AddProjectPage;
