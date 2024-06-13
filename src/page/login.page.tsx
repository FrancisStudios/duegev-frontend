import '../style/login.page.css';
import { Button, Card, CardActions, CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';

const LoginPage = () => {
    return (
        <div id="login-page-wrapper">
            <Card sx={{ minWidth: 275 }} id='duegev_login_card'>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Dûgev Wiki Login™
                    </Typography>
                    <Typography variant="h5" component="div">
                        blin
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        adjective
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
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