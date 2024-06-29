import { AlertColor, AppBar, Box, Button, Card, CardActions, CardContent, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import { UserPrivileges } from '../../../enum/privileges.enum';
import { PrivilegePanelProps } from '../privilege-typedefinitions.type';
import './tag-manager.component.css';
import getString from '../../../util/language-server.util';
import SearchToolBar from '../../atomic-components/custom-search-filter-bar/custom-search-filter-bar.component';
import LabelIcon from '@mui/icons-material/Label';
import { Label, LabelQueryError, LabelQueryResponse } from '../../../type/label.type';
import React from 'react';
import { API } from '../../../services/API/API';
import AddIcon from '@mui/icons-material/Add';
import SnackBar from '../../atomic-components/snackbar/snackbar.component';
import { DuegevAPIResponseMessage } from '../../../services/API/API.enum';

const TagMananger = (props: PrivilegePanelProps) => {
    const [allLabels, setAllLabels] = React.useState<Label[]>([]);
    const [searchResults, setSearchResults] = React.useState<Label[]>([]);
    const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState<string>('');
    const [snackBarSeverity, setSnackBarSeverity] = React.useState<AlertColor>('info');
    const [creationCounter, setCreationCounter] = React.useState<number>(0);

    React.useEffect(() => {
        API
            .getAllLabels()
            .then((response: Array<Label>) => {
                setAllLabels(response);
                setSearchResults(response);
            });
    }, [creationCounter]);

    const _isEligible: boolean = (
        props.privileges.includes(UserPrivileges.SUDO) ||
        props.privileges.includes(UserPrivileges.ADD_LABELS)
    );

    const OPEN_SNACKBAR_ROUTINE = () => {
        setSnackBarOpen(true);
        setTimeout(() => setSnackBarOpen(false), 1500);
    }

    const SEARCH_TOOLBAR_MANAGER = {
        searchChange: (searchValue: string) => {
            console.log(searchValue);
        },

        filterAll: () => { console.log('filter all') },

        filterUsers: () => { console.log('filter mine') }
    }

    const createNewLabel = () => {
        const labelData: Label = {
            label: (document.getElementById('label_name') as HTMLInputElement).value,
            description: (document.getElementById('label_description') as HTMLInputElement).value,
        }

        API
            .createLabel(labelData)
            .then((lqr: LabelQueryResponse) => {

                const shoutWithSnackBar = (severity: AlertColor, message: string) => {
                    setSnackBarMessage(message);
                    setSnackBarSeverity(severity);
                    OPEN_SNACKBAR_ROUTINE();
                }

                if ((lqr.message === DuegevAPIResponseMessage.OK) && (Object.values(LabelQueryError).includes(lqr.data as LabelQueryError))) {
                    switch (lqr.data) {
                        case LabelQueryError.INVALID_SESSION_TOKEN:
                            shoutWithSnackBar('error', getString('INVALID_SESSION_TOKEN') as string);
                            break;
                        case LabelQueryError.INSUFFICIENT_PRIVILEGES:
                            shoutWithSnackBar('error', getString('INSUFFICIENT_PRIVILEGES') as string);
                            break;
                        case LabelQueryError.INTERNAL_ERROR:
                            shoutWithSnackBar('error', getString('INTERNAL_SERVER_ERROR') as string);
                            break;
                        case LabelQueryError.LABEL_ALREADY_EXISTS:
                            shoutWithSnackBar('error', getString('LABEL_ALREADY_EXISTS') as string);
                            break;
                        case LabelQueryError.FAULTY_LABEL:
                            shoutWithSnackBar('error', getString('FAULTY_LABEL') as string);
                            break;
                    }
                } else if (lqr.message === DuegevAPIResponseMessage.OK) {
                    shoutWithSnackBar('success', getString('LABEL_CREATED_SUCCESSFULLY') as string);
                    const _pCreationCounter: number = creationCounter + 1;
                    setCreationCounter(_pCreationCounter);
                } else shoutWithSnackBar('error', getString('INTERNAL_SERVER_ERROR') as string);
            });
    }

    const SearchResultTable = () => {
        return (
            <div id="search-result-table-wrapper">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><LabelIcon /></TableCell>
                                <TableCell align="right">{getString('LABEL_TEXT_VALUE')}</TableCell>
                                <TableCell align="right">{getString('LABEL_DESCRIPTION')}</TableCell>
                                <TableCell align="right">{getString('LABEL_ACTIONS')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                searchResults.length

                                    ? searchResults.map((label: Label) => (
                                        <TableRow
                                            key={label.label}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row"> {label.lid} </TableCell>
                                            <TableCell align="right">{label.label}</TableCell>
                                            <TableCell align="right">{label.description}</TableCell>
                                            <TableCell align="right">{'future actions'}</TableCell>
                                        </TableRow>
                                    ))

                                    : <></>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }

    const LabelAddToolbar = () => {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ pt: 1.2, pb: 1.2, }}>
                    <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', justifyContent: 'start' }}>
                        <TextField
                            id='label_name'
                            label={getString('LABEL')}
                            variant="outlined"
                            InputProps={{
                                endAdornment: <></>
                            }}
                        />
                        <TextField
                            id='label_description'
                            label={getString('DESCRIPTION')}
                            variant="outlined"
                        />
                        <Fab
                            color="primary"
                            size="small"
                            onClick={() => { createNewLabel() }}
                        >
                            <AddIcon />
                        </Fab>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }

    return _isEligible
        ? (
            <>
                <SnackBar
                    message={snackBarMessage}
                    severity={snackBarSeverity}
                    open={snackBarOpen}
                />
                <div id='tag-manager-wrapper'>
                    <Card>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Dûgev Tag Manager &trade;
                            </Typography>
                            <Typography sx={{ fontSize: 11, mb: 1.5 }} color="text.secondary">
                                by Dynar Software Technologies Inc.
                            </Typography>
                            <Typography variant="body2" sx={{ fontSize: 12 }}>
                                {getString('TAG_MANAGER_DESCRIPTION')}
                            </Typography>
                            <Typography sx={{ fontSize: 11, mb: 1.5 }} color="text.secondary">
                                {getString('TAG_MANAGER_WARNING')}
                            </Typography>
                            <SearchToolBar
                                onSearchChange={(searchValue: string) => { SEARCH_TOOLBAR_MANAGER.searchChange(searchValue); }}
                                filterMine={() => { SEARCH_TOOLBAR_MANAGER.filterUsers(); }}
                                filterAll={() => { SEARCH_TOOLBAR_MANAGER.filterAll(); }} />
                            <SearchResultTable />
                            <LabelAddToolbar />
                        </CardContent>
                    </Card>
                </div>
            </>
        )

        : <></>
}


export default TagMananger;