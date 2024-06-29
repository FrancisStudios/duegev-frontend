/**
 * This component can be used for Tag Manager and also for Article Manager
 * page. So we can filter User Owned things quickly 
 * =======================================================================
 */


import { AppBar, Box, Button, ButtonGroup, InputBase, Toolbar, Typography, alpha, styled } from "@mui/material";
import getString from "../../../util/language-server.util";
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export type SearchToolBarProps = {
    filterMine: CallableFunction,
    filterAll: CallableFunction,
    onSearchChange: CallableFunction
}

const SearchToolBar = (props: SearchToolBarProps) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'left',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                        >
                            <ButtonGroup size="small" aria-label="Small button group">
                                {[
                                    <Button
                                        key="mine"
                                        onClick={() => { props.filterMine() }}
                                    >
                                        {getString('MY_LABELS_BUTTON')}
                                    </Button>,
                                    <Button
                                        key="all"
                                        onClick={() => { props.filterAll() }}
                                    >
                                        {getString('ALL_LABELS_BUTTON')}
                                    </Button>,
                                ]}
                            </ButtonGroup>
                        </Box>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            id='search-tool-bar-search'
                            placeholder={getString('SEARCH') as string}
                            onChange={() => {
                                props.onSearchChange((document.getElementById('search-tool-bar-search') as HTMLInputElement).value)
                            }}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default SearchToolBar;