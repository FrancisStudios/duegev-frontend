import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { TextField } from '@mui/material';
import './navigation-bar.component.css';

function NavigationBar() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="absolute">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DÛGEV WIKI
                    </Typography>
                    <TextField
                        id="duegev_date_display"
                        sx={{ m: 1, width: '50ch' }}
                        disabled
                        value={'K.i. 2443 | Cl.u. 401 | E.i. 533 | N.i. 552 | Sz.I 940'}
                    />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavigationBar;