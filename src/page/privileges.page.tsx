
/**
 * User Account Privileges Page
 * User Account Privileges Should be listed here
 * eg. recruit new users, upload new map, upload images,
 * create, delete labels etc...
 */
import '../style/privileges.page.css';
import CreateUserPanel from "../component/privilege-panels/create-user/create-user.panel";
import { UserDataStore } from "../store/user-data.store";
import TagMananger from '../component/privilege-panels/tag-manager/tag-manager.component';
import TimeManager from '../component/privilege-panels/time-manager/time-manager.component';

const UserPrivilegesPage = () => {

    const UserManagement = new UserDataStore();
    const privileges = UserManagement.getLocalUser.privileges;

    return (
        <div id="privileges-page-wrapper">
            <TimeManager privileges={privileges} />
            <TagMananger privileges={privileges} />
            <CreateUserPanel privileges={privileges} />
        </div>
    );
}

export default UserPrivilegesPage;