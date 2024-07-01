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
import { UserDataStore } from '../../../store/user-data.store';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DoNotTouchIcon from '@mui/icons-material/DoNotTouch';
import SlideInDialog from '../../atomic-components/slide-in-dialog/slide-in-dialog.component';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TagMananger = (props: PrivilegePanelProps) => {
    const [allLabels, setAllLabels] = React.useState<Label[]>([]);
    const [searchResults, setSearchResults] = React.useState<Label[]>([]);
    const [snackBarOpen, setSnackBarOpen] = React.useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState<string>('');
    const [snackBarSeverity, setSnackBarSeverity] = React.useState<AlertColor>('info');
    const [creationCounter, setCreationCounter] = React.useState<number>(0);
    const [openConfirmDialog, setOpenConfirmDialog] = React.useState<boolean>(false);
    const [titleConfirmDialog, setTitleConfirmDialog] = React.useState<string>('');
    const [selectedLabel2Delete, setSelectedLabel2Delete] = React.useState<string>('');
    const [deleteIntent, setDeleteIntent] = React.useState<Label>({} as Label);

    const UserManagement = UserDataStore.getInstance();

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
            const thisSearch: Array<Label> = allLabels.filter(l => l.label.includes(searchValue));
            setSearchResults(thisSearch);
        },

        filterAll: () => {
            setSearchResults(allLabels);
        },

        filterUsers: () => {
            const myLabels: Array<Label> = allLabels.filter(l => l.uid === UserManagement.getLocalUser.uid);
            setSearchResults(myLabels);
        }
    }

    const LABEL_ACTIONS = {
        template: (label: Label) => {
            return (
                <div className='label-action-group'>
                    <Fab size="small" color="primary" onClick={() => { LABEL_ACTIONS.editLabel(label) }}>
                        <EditIcon />
                    </Fab>
                    <Fab size="small" color="error" onClick={() => { LABEL_ACTIONS.deleteLabel(label) }}>
                        <DeleteForeverIcon />
                    </Fab>
                </div>
            );
        },

        notEditable: () => {
            return (
                <div className="label-action-group">
                    <Fab size="small" color="error" disabled>
                        <DoNotTouchIcon />
                    </Fab>
                </div>
            );
        },

        deleteLabel: (label: Label) => {
            setTitleConfirmDialog(getString('DELETE_LABEL_CONFIRMATION_TITLE'));
            setSelectedLabel2Delete(label.label);
            setOpenConfirmDialog(true);
            setDeleteIntent(label);
        },

        confirmLabelDelete: () => {
            API
                .deleteLabel(deleteIntent)
                .then((response) => {
                    if (response.message === DuegevAPIResponseMessage.OK) {
                        shoutWithSnackBar('success', getString('LABEL_DELETED') as string);
                        const _pCreationCounter: number = creationCounter + 1;
                        setOpenConfirmDialog(false);
                        setCreationCounter(_pCreationCounter);
                    } else shoutWithSnackBar('error', getString('COULD_NOT_DELETE_LABEL') as string);
                });
        },

        editLabel: (label: Label) => {
            console.log('edit', label);
        }
    }

    const shoutWithSnackBar = (severity: AlertColor, message: string) => {
        setSnackBarMessage(message);
        setSnackBarSeverity(severity);
        OPEN_SNACKBAR_ROUTINE();
    }


    const createNewLabel = () => {
        const labelData: Label = {
            label: (document.getElementById('label_name') as HTMLInputElement).value,
            description: (document.getElementById('label_description') as HTMLInputElement).value,
        }

        API
            .createLabel(labelData)
            .then((lqr: LabelQueryResponse) => {
                if ((lqr.message === DuegevAPIResponseMessage.FAIL) && (Object.values(LabelQueryError).includes(lqr.data as LabelQueryError))) {
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

    const ConfirmLabelDeletionContent = () => {
        return (
            <div id='label-deletion-confirm'>
                {getString('DELETE_LABEL_CONFIRMATION_TEXT')}
                <Typography sx={{ fontSize: 18, textAlign: 'center' }} color="text.secondary">
                    {selectedLabel2Delete}
                </Typography>
                <Fab
                    variant="extended"
                    onClick={() => { LABEL_ACTIONS.confirmLabelDelete() }}
                >
                    <CheckCircleIcon sx={{ mr: 1 }} />
                    {getString('CONFIRM')}
                </Fab>

            </div>
        );
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
                                            <TableCell align="right">
                                                <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                                    {label.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                {
                                                    (label.uid === UserManagement.getLocalUser.uid)
                                                        ? LABEL_ACTIONS.template(label)
                                                        : LABEL_ACTIONS.notEditable()
                                                }
                                            </TableCell>
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
                    <Toolbar sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', justifyContent: 'end' }}>
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
                <SlideInDialog
                    open={openConfirmDialog}
                    close={() => { setOpenConfirmDialog(false) }}
                    title={titleConfirmDialog}
                    content={ConfirmLabelDeletionContent()}
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