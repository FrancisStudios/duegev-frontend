import { AlertColor, Button, Card, CardActions, CardContent, FormControlLabel, Switch, Typography } from "@mui/material";
import { PrivilegePanelProps } from "../privilege-typedefinitions.type";
import './create-user.panel.css';
import '../generic-privilege-panel.style.css';
import getString from "../../../util/language-server.util";
import CustomInput from "../../atomic-components/custom-input/custom-input";
import { DuegevEncryptor } from "../../../util/encryptor.util";
import React from "react";
import SnackBar from "../../atomic-components/snackbar/snackbar.component";
import { API } from "../../../services/API/API";
import { UserCreationData, UserCreationResponse } from "../../../type/user-data.type";
import { UserDataStore } from "../../../store/user-data.store";
import { DuegevAPIResponseMessage } from "../../../services/API/API.enum";

const CreateUserPanel = (props: PrivilegePanelProps) => {
    const [copyAck, setCopyAck] = React.useState<boolean>(false);
    const [userAck, setUserAck] = React.useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState<string>('');
    const [snackBarSeverity, setSnackBarSeverity] = React.useState<AlertColor>('info');

    const UserManagement = UserDataStore.getInstance();

    const _isEligible: boolean = (
        props.privileges.includes('sudo') ||
        props.privileges.includes('recruiter')
    );

    const refreshPasswordGen = (data: { event: Event, id: string, label: string }) => {
        (document.getElementById(data.id) as HTMLInputElement).value = DuegevEncryptor.generateRandomString(8);
    }

    const AttemptUserCreation = () => {
        const username: string = (document.getElementById('new-username') as HTMLInputElement).value;
        const password: string = (document.getElementById('new-password') as HTMLInputElement).value;
        const _criteria: boolean = (
            (username.length >= 3) &&
            (password.length >= 8) &&
            copyAck && userAck
        );

        if (_criteria) {
            const userCreationData: UserCreationData = {
                username: username,
                password: password,
                session_token: UserManagement.getSessionToken
            }

            API
                .createUser(userCreationData)
                .then((message: UserCreationResponse) => {
                    console.log(message);
                    if (message.message === DuegevAPIResponseMessage.OK && message.data.message === 'created') {
                        setSnackBarMessage(getString('USER_SUCCESSFULLY_CREATED') as string);
                        setSnackBarSeverity('success');
                        (document.getElementById('new-username') as HTMLInputElement).value = '';
                        OPEN_SNACKBAR_ROUTINE();
                    } else {
                        setSnackBarMessage(getString('USER_CREATE_INTERNAL_ERROR') as string)
                        setSnackBarSeverity('error');
                        OPEN_SNACKBAR_ROUTINE();
                    }
                });
        } else {
            setSnackBarMessage(getString('CREATE_USER_DATA_ENTRY_ERROR') as string);
            setSnackBarSeverity('error');
            OPEN_SNACKBAR_ROUTINE();
        }
    }

    const OPEN_SNACKBAR_ROUTINE = () => {
        setSnackBarOpen(true);
        setTimeout(() => setSnackBarOpen(false), 1500);
    }

    return _isEligible
        ? (
            <>
                <div id="create-user-panel-wrapper" className="genericPanelWrapper">
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {getString('USER_RECRUITMENT_PANEL')}
                            </Typography>
                            <Typography sx={{ mb: 1.5, fontSize: 11 }} color="text.secondary">
                                by Dynar Software Technologies Inc.
                            </Typography>
                            <Typography variant="body2">
                                {getString('USER_RECRUITMENT_MESSAGE')}
                            </Typography>
                            <div id="cuserpanel-content">
                                <div id="cuserpanel-row">
                                    <CustomInput id="new-username" label={getString('USERNAME') as string} />
                                    <CustomInput
                                        id="new-password"
                                        label={getString('PASSWORD') as string}
                                        disabled
                                        refresh
                                        refreshClicked={(data: { event: Event; id: string; label: string; }) => {
                                            refreshPasswordGen(data);
                                        }}
                                        defaultValue={DuegevEncryptor.generateRandomString(8)} />
                                </div>
                                <div id="cuserpanel-row">
                                    <Typography sx={{ fontSize: 12 }}>
                                        {getString('USER_RECRUITMENT_COPY_MESSAGE')}
                                    </Typography>
                                </div>
                                <div id="cuserpanel-row">
                                    <FormControlLabel control={<Switch onChange={() => { setCopyAck(!copyAck); }} />} label={getString('ACKNOWLEDGE_SHARE') as string} />
                                </div>
                                <div id="cuserpanel-row">
                                    <FormControlLabel control={<Switch onChange={() => { setUserAck(!userAck); }} />} label={getString('ACKNOWLEDGE_USER') as string} />
                                </div>
                            </div>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => { AttemptUserCreation(); }}>{getString('CREATE_USER')}</Button>
                        </CardActions>
                    </Card>
                </div>
                <SnackBar
                    message={snackBarMessage}
                    severity={snackBarSeverity}
                    open={snackBarOpen}
                />
            </>
        )

        : (<></>);
}

export default CreateUserPanel;