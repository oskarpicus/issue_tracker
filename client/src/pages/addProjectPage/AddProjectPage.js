import './addProjectPage.css';
import {useEffect, useState} from "react";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import {Box, Button} from "@mui/material";
import LabeledField from "../../components/labeledField/LabeledField";
import Menu from "../../components/menu/Menu";
import {getAllProjectRoles} from "../../services/enumService";
import {errorPage, responseTypes} from "../../const";
import {useHistory} from "react-router-dom";
import MyComboBox from "../../components/myComboBox/MyComboBox";
import {addProject} from "../../services/projectService";

const AddProject = (properties) => {
    const credentials = properties.credentials === undefined ?
        properties.location.state.credentials : properties.credentials;

    const setAlert = properties.setAlert;

    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        involvements: [
            {
                user: {
                    id: credentials.user.id
                },
                role: ""
            }
        ]
    });

    const [projectRoles, setProjectRoles] = useState([]);

    let history = useHistory();

    useEffect(() => {
        const getData = () => {
            getAllProjectRoles(credentials.jwt)
                .then(response => {
                    if (response[responseTypes.key] === responseTypes.success) {
                        setProjectRoles(response.data);
                    } else {
                        history.push(errorPage);
                    }
                })
        };

        if (credentials.user !== undefined) {
            getData();
        }
    }, [credentials, history]);

    const handleClick = () => {
        addProject(formValues, credentials.jwt)
            .then(response => {
                if (response[responseTypes.key] === responseTypes.success) {
                    setAlert({
                        state: true,
                        severity: "success",
                        message: "Project created successfully",
                        backgroundColor: "inherit"
                    });
                } else {
                    setAlert({
                        state: true,
                        severity: "error",
                        message: typeof(response.data) === "string" ? response.data : "Failed to create project",
                        backgroundColor: "inherit"
                    });
                }
            })
    };

    const content = (
        <Box id={"add-project-page"}>
            <p className={"action-title"}>Add project</p>
            <LabeledField
                text={"Title"}
                type={"input"}
                name={"title"}
                onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
            />
            <LabeledField
                text={"Description"}
                type={"textarea"}
                name={"description"}
                onChange={(name, value) => setFormValues((prev) => ({...prev, [name]: value}))}
            />
            <MyComboBox
                className={"combo-box-project-role"}
                label={"Your role in the project"}
                options={projectRoles}
                onChange={(event, value) => {
                    formValues.involvements[0].role = value;
                    setFormValues(formValues);
                }}
                getOptionLabel={(option) => option.replaceAll("_", " ")}
            />
            <Button
                variant={"contained"}
                className={"action-button button-save-project"}
                onClick={handleClick}
            >
                Save
            </Button>
        </Box>
    );

    return (
        <Menu credentials={credentials} content={content}/>
    )
};

const AddProjectPage = withRouter(AddProject);

export default AddProjectPage;
