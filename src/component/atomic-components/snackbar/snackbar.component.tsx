import { Alert, Button, Snackbar } from "@mui/material";
import React from "react";

const SnackBar = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => { setOpen(true); };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClick}>Open Snackbar</Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </>
    );
}

export default SnackBar;