import { Alert, AlertColor, Button, Snackbar } from "@mui/material";
import React from "react";


export type SnackBarProps = {
    message: string,
    severity: AlertColor
    open: boolean
}

const SnackBar = (props: SnackBarProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => { setOpen(true); };
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    if (props.open) setTimeout(handleClick, 100);

    return (
        <>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity={props.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default SnackBar;