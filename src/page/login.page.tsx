import '../style/login.page.css';
import { Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import getString from '../util/language-server.util';
import { DuegevEncryptor } from '../util/encryptor.util';
import { DUEGEV_CONSTANTS } from '../enum/constants.enum';
import User from '../services/user-auth.service';
import { UserAuthenticationResponse } from '../type/user-data.type';
import { DuegevAPIResponseMessage } from '../services/API/API.enum';
import RoutingService from '../services/custom-routing.service';
import PAGES from '../enum/valid-page-locations.enum';
import { UserDataStore } from '../store/user-data.store';

const LoginPage = () => {

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
                console.log(response);
                switch (response.message) {
                    case DuegevAPIResponseMessage.OK:
                        const userMgmt = UserDataStore.getInstance();
                        userMgmt.loginNewUser(response);
                        clearInputFields();
                        RoutingService.navigate(PAGES.HOME);
                        break;

                    case DuegevAPIResponseMessage.FAIL:
                        console.log('fail');
                        break;
                }
            });
    }

    return (
        <div id="login-page-wrapper">
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