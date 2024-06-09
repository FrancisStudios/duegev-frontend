import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
});

export default function getCustomTheme() {
    return theme;
}