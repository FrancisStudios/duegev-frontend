
/**
 * User Account Settings Page
 * Every user defined customisation
 * should be set on this level
 */
import '../style/settings.page.css';
import { Avatar, Button, Card, CardActions, CardContent, Fab, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import getString from '../util/language-server.util';
import { styled } from '@mui/material/styles';
import { UserDataStore } from '../store/user-data.store';
import OptionSelectCustom, { OptionSelectCustomOption } from '../component/atomic-components/option-select/option-select.component';
import { ValidLanguages } from '../type/language.type';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TagList from '../component/atomic-components/tag-list/tag-list.component';
import { DUEGEV_CONSTANTS } from '../enum/constants.enum';
import { UserData } from '../type/user-data.type';
import React from 'react';
import SlideInDialog from '../component/atomic-components/slide-in-dialog/slide-in-dialog.component';
import GroupIcon from '@mui/icons-material/Group';

const UserSettingsPage = () => {

    const userManagement = UserDataStore.getInstance();
    const availabeLanguages: Array<OptionSelectCustomOption> = Object.values(ValidLanguages).map((value) => ({ label: value, value: value }));
    const [userAvatar, setUserAvatar] = React.useState(userManagement.getLocalUser.profileImg);
    const [openDiffConfirmDialog, setOpenDiffConfirmDialog] = React.useState(false);
    const [NewUserDataConstruct, setNewUserDataConstruct] = React.useState<UserData>(
        {
            uid: userManagement.getLocalUser.uid,
            auth: {
                username: userManagement.getLocalUser.auth.username,
                password: userManagement.getLocalUser.auth.password
            },
            playerName: userManagement.getLocalUser.playerName,
            prefix: userManagement.getLocalUser.prefix,
            language: userManagement.getLocalUser.language,
            profileImg: userManagement.getLocalUser.profileImg,
            privileges: userManagement.getLocalUser.privileges
        }
    );

    let UserDataChanges: Array<UserDataChangeManifestMark> = [];

    type UserDataChangeManifestMark = {
        name: string,
        oldValue: string,
        newValue: string
    }

    const SETTINGS_CHANGE_CONFIRM_DIALOG_METHODS = {
        exit: () => { },
        save: () => { }
    }

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    /* MANAGE & STORE SETTINGS CHANGES*/
    const SETTINGS_FORM_MANAGER = {

        avatarUpload: () => {
            const fileUploader: any = (document.getElementById('avatar-file-upload'));
            const fileName = fileUploader.files[0].name ?? DUEGEV_CONSTANTS.invalid;
            const file = fileUploader.files[0];
            const validFile: boolean = (fileName && fileName !== DUEGEV_CONSTANTS.invalid && fileName.length > 1);
            const _fileReader = new FileReader();

            if (validFile) {
                const _fileReference = new File(
                    [file],
                    `${userManagement.getLocalUser.playerName}-avatar`,
                    { type: file.type }
                );

                _fileReader.readAsDataURL(_fileReference)
                _fileReader.addEventListener('load', () => {
                    const _result = _fileReader.result?.toString() ?? '';
                    const _regex = /^data:.+\/(.+);base64,(.*)$/;
                    if (_regex.test(_result)) {
                        NewUserDataConstruct.profileImg = _result;
                        setUserAvatar(_result);
                    }
                });
            }
        },

        changePlayernameOrPrefix: (target: DUEGEV_CONSTANTS.playername | DUEGEV_CONSTANTS.prefix) => {
            switch (target) {
                case DUEGEV_CONSTANTS.playername:
                    NewUserDataConstruct.playerName = ((document.getElementById('settings-playername') as HTMLInputElement).value as string) ?? '';
                    break;

                case DUEGEV_CONSTANTS.prefix:
                    NewUserDataConstruct.prefix = ((document.getElementById('settings-prefix') as HTMLInputElement).value as string) ?? '';
                    break;
            }
        },

        changeLanguage: (e: PointerEvent) => { NewUserDataConstruct.language = (e.target as HTMLSelectElement)?.value as ValidLanguages; },

        changeUsernameOrPassword(target: DUEGEV_CONSTANTS.username | DUEGEV_CONSTANTS.password) {
            switch (target) {
                case DUEGEV_CONSTANTS.username:
                    NewUserDataConstruct.auth.username = ((document.getElementById('settings-username') as HTMLInputElement).value as string) ?? '';
                    break;

                case DUEGEV_CONSTANTS.password:
                    NewUserDataConstruct.auth.password = ((document.getElementById('settings-password') as HTMLInputElement).value as string) ?? '';
                    break;
            }
        }
    }

    const detectUserDataChanges = () => {
        /* USERNAME */
        if (userManagement.getLocalUser.auth.username !== NewUserDataConstruct.auth.username) UserDataChanges.push(
            {
                name: getString('USERNAME') as string,
                oldValue: userManagement.getLocalUser.auth.username,
                newValue: '********'
            }
        );
        /* PASSWORD */
        if (userManagement.getLocalUser.auth.password !== NewUserDataConstruct.auth.password) UserDataChanges.push(
            {
                name: getString('PASSWORD') as string,
                oldValue: userManagement.getLocalUser.auth.password,
                newValue: '********'
            }
        );
        /* PLAYER NAME */
        if (userManagement.getLocalUser.playerName !== NewUserDataConstruct.playerName) UserDataChanges.push(
            {
                name: getString('PLAYER_NAME') as string,
                oldValue: userManagement.getLocalUser.playerName,
                newValue: NewUserDataConstruct.playerName
            }
        );
        /* PREFIX */
        if (userManagement.getLocalUser.prefix !== NewUserDataConstruct.prefix) UserDataChanges.push(
            {
                name: getString('PREFIX') as string,
                oldValue: userManagement.getLocalUser.prefix,
                newValue: NewUserDataConstruct.prefix
            }
        );
        /* PROFILE IMG */
        if (userManagement.getLocalUser.profileImg !== NewUserDataConstruct.profileImg) UserDataChanges.push(
            {
                name: getString('PROFILE_IMG') as string,
                oldValue: userManagement.getLocalUser.profileImg.substring(15, 30) + '...',
                newValue: NewUserDataConstruct.profileImg.substring(15, 30) + '...'
            }
        );
        /* PREFIX */
        if (userManagement.getLocalUser.language !== NewUserDataConstruct.language) UserDataChanges.push(
            {
                name: getString('LANGUAGE') as string,
                oldValue: userManagement.getLocalUser.language,
                newValue: NewUserDataConstruct.language
            }
        );
    }

    const avatar = () => {
        return userAvatar.length < 50
            ? (<Fab color="primary" aria-label="add" disabled><ManageAccountsIcon /></Fab>)
            : <Avatar alt="Duegev Profile Picture" src={userAvatar} sx={{ width: 56, height: 56 }} />
    }

    const userSettingsForm = () => {
        return (
            <>
                <div className="row">
                    {avatar()}
                    <Button
                        id="settings-profileimg"
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        {getString('UPLOAD_PROFILE_IMG') as string}
                        <VisuallyHiddenInput
                            type="file"
                            accept="image/.jpg, .jpeg, .png"
                            onChange={SETTINGS_FORM_MANAGER.avatarUpload}
                            id="avatar-file-upload"
                        />
                    </Button>
                </div>
                <div className="row">
                    <TextField
                        id="settings-username"
                        label={getString('USERNAME')}
                        variant="outlined"
                        defaultValue={userManagement.getLocalUser.auth.username}
                        onChange={() => SETTINGS_FORM_MANAGER.changeUsernameOrPassword(DUEGEV_CONSTANTS.username)}
                    />
                    <TextField
                        id="settings-password"
                        label={getString('PASSWORD')}
                        variant="outlined"
                        type="password"
                        defaultValue={userManagement.getLocalUser.auth.password}
                        onChange={() => SETTINGS_FORM_MANAGER.changeUsernameOrPassword(DUEGEV_CONSTANTS.password)}
                    />
                </div>
                <div className="row">
                    <TextField
                        id="settings-prefix"
                        label={getString('PREFIX')}
                        defaultValue={userManagement.getLocalUser.prefix}
                        onChange={() => { SETTINGS_FORM_MANAGER.changePlayernameOrPrefix(DUEGEV_CONSTANTS.prefix) }}
                    />
                    <TextField
                        id="settings-playername"
                        label={getString('PLAYER_NAME')}
                        defaultValue={userManagement.getLocalUser.playerName}
                        onChange={() => { SETTINGS_FORM_MANAGER.changePlayernameOrPrefix(DUEGEV_CONSTANTS.playername) }}
                    />
                    <OptionSelectCustom
                        options={availabeLanguages}
                        label={getString('LANGUAGE') as string}
                        defaultValue={userManagement.getLocalUser.language}
                        onSelect={(e: PointerEvent) => { SETTINGS_FORM_MANAGER.changeLanguage(e) }}
                    />
                </div>
                <div className="row">
                    <TagList chips={userManagement.getLocalUser.privileges as Array<string>}></TagList>
                </div>
            </>
        );
    }

    const renderPasswordConfirmationField = () => {
        return NewUserDataConstruct.auth.password !== userManagement.getLocalUser.auth.password
            ? (<>
                <Typography sx={{ mt: 1.5, fontSize: 15 }} color="text.secondary">
                    {getString('CONFIRM_YOUR_NEW_PW')}
                </Typography>
                <div id="confirm-new-password">
                    <TextField id="new-password-confirm" label={getString('NEW_PASSWORD')} variant="outlined" type="password" />
                </div>
            </>)

            : <></>
    }

    const ConfirmationDialogContent = () => {
        detectUserDataChanges();
        return (
            <div id="confirmation-dialog-content">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><GroupIcon /></TableCell>
                                <TableCell align="right">{getString('OLD_VALUE')}</TableCell>
                                <TableCell align="right">{getString('NEW_VALUE')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {UserDataChanges.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.oldValue}</TableCell>
                                    <TableCell align="right">{row.newValue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {renderPasswordConfirmationField()}
                <Typography sx={{ mt: 1.5, fontSize: 15 }} color="text.secondary">
                    {getString('CONFIRM_WITH_LOGIN')}
                </Typography>
                <div id="confirm-password">
                    <TextField id="username-confirm" label={getString('USERNAME')} variant="outlined" />
                    <TextField id="password-confirm" label={getString('PASSWORD')} variant="outlined" type="password" />
                </div>
            </div>
        );
    }

    return (
        <div id="settings-card-wrapper">
            <SlideInDialog
                title={getString('DO_YOU_WANT_TO_CHANGE_USER_DATA') as string}
                open={openDiffConfirmDialog}
                close={() => { setOpenDiffConfirmDialog(false) }}
                content={ConfirmationDialogContent()}
                save={() => SETTINGS_CHANGE_CONFIRM_DIALOG_METHODS.save()}
                exit={() => SETTINGS_CHANGE_CONFIRM_DIALOG_METHODS.exit()}
            />
            <Card id="settings-card">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Dûgev Account Settings &trade;
                    </Typography>
                    <Typography variant="h5" component="div">
                        {`${userManagement.getLocalUser.prefix} ${userManagement.getLocalUser.playerName}`}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 11 }} color="text.secondary">
                        by Dynar Software Inc.
                    </Typography>
                    <div id="user-settings-form-wrapper">
                        {userSettingsForm()}
                    </div>
                </CardContent>
                <CardActions id="settings-card-actions">
                    <Button size="small" onClick={() => setOpenDiffConfirmDialog(true)}>{getString('SAVE')}</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default UserSettingsPage;