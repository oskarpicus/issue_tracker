import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {Slide} from "@mui/material";
import './mySnackbar.css';

const Alert = React.forwardRef((properties, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...properties} />;
});

const MySnackbar = React.forwardRef(({alert, setAlert}, ref) => {
    const onClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlert((prev) => ({...prev, state: false}));
    }

    return (
        <Snackbar
            className={"my-snackbar"}
            ref={ref}
            open={alert.state}
            autoHideDuration={6000}
            onClose={onClose}
            anchorOrigin={{
                horizontal: "left",
                vertical: "bottom"
            }}
            TransitionComponent={Slide}
            style={{backgroundColor: alert.backgroundColor}}
        >
            <Alert
                onClose={onClose}
                severity={alert.severity}
                elevation={6}
                variant={"filled"}
            >
                {alert.message}
            </Alert>
        </Snackbar>
    )
});

export default MySnackbar;
