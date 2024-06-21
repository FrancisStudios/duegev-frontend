
/**
 * User Account Settings Page
 * Every user defined customisation
 * should be set on this level
 */
import '../style/settings.page.css';
import { Button, Card, CardActions, CardContent, Fab, TextField, Typography } from "@mui/material";
import getString from '../util/language-server.util';
import { styled } from '@mui/material/styles';
import { UserDataStore } from '../store/user-data.store';
import OptionSelectCustom, { OptionSelectCustomOption } from '../component/atomic-components/option-select/option-select.component';
import { ValidLanguages } from '../type/language.type';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TagList from '../component/atomic-components/tag-list/tag-list.component';

const UserSettingsPage = () => {

    const userManagement = UserDataStore.getInstance();
    const availabeLanguages: Array<OptionSelectCustomOption> = Object.values(ValidLanguages).map((value) => ({ label: value, value: value }));

    /*
    TODO: kövessem a változtatásokat egy arrayban és a mentés gomb az alapján fog bármit is csinálni
    ha a változtatásokat már egy másik service megcsinálta PL username&&password / profileIMG akkor
    nem kell hogy bármit is elmentsen
    */

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

    const avatar = () => {
        return userManagement.getLocalUser.profileImg.length < 50
            ? (<Fab color="primary" aria-label="add" disabled><ManageAccountsIcon /></Fab>)
            : (<Fab color="primary" aria-label="add"><ManageAccountsIcon /></Fab>);// Placeholder for real avatar TODO: real avatar from base64
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
                        <VisuallyHiddenInput type="file" />
                    </Button>
                </div>
                <div className="row">
                    <TextField id="settings-username" label={getString('USERNAME')} variant="outlined" defaultValue={userManagement.getLocalUser.auth.username} disabled />
                    <TextField id="settings-password" label={getString('PASSWORD')} variant="outlined" type="password" defaultValue={userManagement.getLocalUser.auth.password} disabled />
                    <Button variant="contained" size="large">
                        {getString('CHANGE')}
                    </Button>
                </div>
                <div className="row">
                    <TextField
                        id="settings-prefix"
                        label={getString('PREFIX')}
                        defaultValue={userManagement.getLocalUser.prefix}
                    />
                    <TextField
                        id="settings-playername"
                        label={getString('PLAYER_NAME')}
                        defaultValue={userManagement.getLocalUser.playerName}
                    />
                    <OptionSelectCustom
                        options={availabeLanguages}
                        label={getString('LANGUAGE') as string}
                        defaultValue={userManagement.getLocalUser.language}
                    />
                </div>
                <div className="row">
                    <TagList chips={userManagement.getLocalUser.privileges as Array<string>}></TagList>
                </div>
            </>
        );
    }

    return (
        <div id="settings-card-wrapper">
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
                    <Button size="small">{getString('SAVE')}</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default UserSettingsPage;