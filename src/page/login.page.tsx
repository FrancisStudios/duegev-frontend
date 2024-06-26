import '../style/login.page.css';
import { Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import getString from '../util/language-server.util';
import { DuegevEncryptor } from '../util/encryptor.util';
import { DUEGEV_CONSTANTS } from '../enum/constants.enum';
import User from '../services/user-auth.service';
import { UserAuthenticationResponse } from '../type/user-data.type';
import { DuegevAPIResponseMessage } from '../services/API/API.enum';
import PAGES from '../enum/valid-page-locations.enum';
import { UserDataStore } from '../store/user-data.store';
import { useNavigate } from 'react-router-dom';
import SnackBar from '../component/atomic-components/snackbar/snackbar.component';
import React from 'react';

const LoginPage = () => {
    const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
    const OPEN_SNACKBAR_ROUTINE = () => { setSnackBarOpen(true); setTimeout(() => setSnackBarOpen(false), 1500); }

    const navigate = useNavigate();

    const clearInputFields = () => {
        (document.getElementById('duegev-username') as HTMLInputElement).value = '';
        (document.getElementById('duegev-password') as HTMLInputElement).value = '';
    }

    const BootstrapLogin = () => {
        const username: string = (document.getElementById('duegev-username') as HTMLInputElement).value;
        const password: string = DuegevEncryptor.SHA512Encrypt(
            (document.getElementById('duegev-password') as HTMLInputElement).value,
            DUEGEV_CONSTANTS.defaultLoginSalt
        );

        User
            .attemptAuthentication(username, password)
            .then((response: UserAuthenticationResponse) => {
                switch (response.message) {
                    case DuegevAPIResponseMessage.OK:
                        const userMgmt = UserDataStore.getInstance();
                        userMgmt.loginNewUser(response);
                        clearInputFields();
                        navigate(`/${PAGES.HOME}`);
                        break;

                    case DuegevAPIResponseMessage.FAIL:
                        OPEN_SNACKBAR_ROUTINE();
                        break;
                }
            });
    }

    return (
        <div id="login-page-wrapper">
            <SnackBar
                open={snackBarOpen}
                message={getString('UNSUCCESSFUL_LOGIN_MSG') as string}
                severity={'error'}
            />
            <Card sx={{ minWidth: 275 }} id='duegev_login_card'>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Dûgev Wiki Login™
                    </Typography>
                    <div id="duegev-login-form">
                        <TextField id="duegev-username" label={getString('USERNAME')} variant="outlined" />
                        <TextField id="duegev-password" label={getString('PASSWORD')} variant="outlined" type="password" />
                    </div>
                    <Divider />
                    <Typography variant="body2" id="duegev-login-disclaimer">
                        {getString('LOGIN_MGMT_DISCLAIMER')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => { BootstrapLogin() }}>{getString('LOG_IN')}</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LoginPage;