import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import './navigation-bar.component.css';
import React from 'react';

function NavigationBar() {

    const [open, setOpen] = React.useState(false);


    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    const DrawerContents = () => {
        return (
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                <List>
                    {['Home', 'Create', 'Manage', 'Login'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        )
    }

    const MenuDrawer = () => {
        return (
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerContents()}
            </Drawer>
        )
    }


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="absolute">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleDrawer(true)}
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
            {MenuDrawer()}
        </>
    )
}

export default NavigationBar;