import '../style/login.page.css';
import { Button, Card, CardActions, CardContent, Divider, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

const LoginPage = () => {
    return (
        <div id="login-page-wrapper">
            <Card sx={{ minWidth: 275 }} id='duegev_login_card'>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Dûgev Wiki Login™
                    </Typography>
                    <div id="duegev-login-form">
                        <TextField id="duegev-username" label="Username" variant="outlined" />
                        <TextField id="duegev-password" label="Password" variant="outlined" />
                    </div>
                    <Divider />
                    <Typography variant="body2" id="duegev-login-disclaimer">
                        Your login information is managed by the Brotherhood of Unicum™ subnet.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Log In</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default LoginPage;