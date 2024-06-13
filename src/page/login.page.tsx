import '../style/login.page.css';
import { Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { LanguageModel } from '../type/language.type';
import getString from '../util/language-server.util';

const LoginPage = () => {
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
                    <Button size="small">{getString('LOG_IN')}</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LoginPage;