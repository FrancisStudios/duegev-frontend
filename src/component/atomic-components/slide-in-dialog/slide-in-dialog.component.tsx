import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import getString from '../../../util/language-server.util';


/* Transition Helper */
const Transition = React.forwardRef(
    function Transition(
        props: TransitionProps & { children: React.ReactElement<any, any>; },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export type SlideInDialogProps = {
    open: boolean,
    close: CallableFunction,
    title: string
    content: React.ReactElement,
    save?: CallableFunction,
    exit?: CallableFunction
};

const SlideInDialog = (props: SlideInDialogProps) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); props.close(); };

    /* Sorry for this: There's an issue with the rendering cycle */
    if (props.open) setTimeout(handleClickOpen, 100);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>{props.title}</DialogTitle>
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={
                            () => {
                                if (props.save) props.save();
                                handleClose();
                            }}>
                        {getString('SAVE')}
                    </Button>
                    <Button onClick={
                        () => {
                            if (props.exit) props.exit();
                            handleClose();
                        }
                    }>
                        {getString('CANCEL')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default SlideInDialog;