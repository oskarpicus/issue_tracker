import './addParticipantModal.css';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import MyComboBox from "../myComboBox/MyComboBox";
import {useEffect, useState} from "react";
import {getAllUsernames} from "../../services/userService";
import {getAllProjectRoles} from "../../services/enumService";
import {addInvolvement} from "../../services/involvementService";
import {responseTypes} from "../../const";

// will remove the usernames that are already part of the project
const filterUsernames = (project, usernames) => {
    return usernames.filter(username =>
        project.involvements.find(involvement => involvement.user.username === username) === undefined);
}

const AddParticipantModal = ({open, setOpen, credentials, project, setAlert}) => {
    const [usernames, setUsernames] = useState([]);
    const [roles, setRoles] = useState([]);
    const [data, setData] = useState({
        projectId: project.id,
        requesterId: credentials.user.id,
        username: "",
        role: ""
    });

    useEffect(() => {
        let getData = () => {
            getAllUsernames(credentials.jwt)
                .then(response => {
                    setUsernames(filterUsernames(project, response.data))
                });
        }

        if (credentials.user !== undefined) {
            getData();
        }
    }, [credentials, project]);

    useEffect(() => {
        let getData = () => {
            getAllProjectRoles(credentials.jwt)
                .then(response => {
                    setRoles(response.data);
                })
        }

        if (credentials.user !== undefined) {
            getData();
        }
    }, [credentials])

    const handleConfirm = () => {
        addInvolvement(data, credentials.jwt)
            .then(response => {
                const message = response[responseTypes.key] === responseTypes.success
                    ? `Added ${data.username} to the ${project.title} project`
                    : response.data;
                setAlert({
                    state: true,
                    severity: response[responseTypes.key],
                    message: message,
                    backgroundColor: "inherit"
                })
                handleClose();
            })
    }

    const handleClose = () => {
        setOpen(false);
        setData(prev => ({...prev, username: "", role: ""}));
    }

    return (
        <Dialog open={open}>
            <DialogTitle className={"dialog-title-add-participant"}>Add participant</DialogTitle>
            <DialogContent>
                <DialogContentText style={{marginBottom: "20px"}}>
                    Please select a user to add to the project.
                </DialogContentText>
                <MyComboBox
                    options={usernames}
                    label={"Username"}
                    getOptionLabel={option => option}
                    onChange={(event, v) => setData((prev) => ({...prev, username: v}))}
                />
                {
                    (data.username !== "" && data.username !== null)
                    &&
                    <MyComboBox
                        className={"combo-box-project-role"}
                        options={roles}
                        getOptionLabel={(option) => option.replaceAll("_", " ")}
                        label={`${data.username}'s role`}
                        onChange={(event, v) => setData((prev) => ({...prev, role: v}))}
                    />
                }
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    className={"action-button"}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant={"contained"}
                    className={"action-button"}
                    onClick={handleConfirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddParticipantModal;
