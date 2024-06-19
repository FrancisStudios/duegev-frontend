import '../style/login.page.css';
import { Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import getString from '../util/language-server.util';
import { DuegevEncryptor } from '../util/encryptor.util';
import { DUEGEV_CONSTANTS } from '../enum/constants.enum';
import User from '../services/user-auth.service';

const LoginPage = () => {

    const BootstrapLogin = () => {
        const username: string = (document.getElementById('duegev-username') as HTMLInputElement).value;
        const password: string = DuegevEncryptor.SHA512Encrypt(
            (document.getElementById('duegev-password') as HTMLInputElement).value,
            DUEGEV_CONSTANTS.defaultLoginSalt
        );
        User.attemptAuthentication(username, password); /* TODO: Returns a promise => handleResponse (auth success/fail) */
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
                        <TextField id="duegev-password" label={getString('PASSWORD')} variant="outlined" />
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