
/**
 * User Account Privileges Page
 * User Account Privileges Should be listed here
 * eg. recruit new users, upload new map, upload images,
 * create, delete labels etc...
 */
import '../style/privileges.page.css';
import CreateUserPanel from "../component/privilege-panels/create-user/create-user.panel";
import { UserDataStore } from "../store/user-data.store";

const UserPrivilegesPage = () => {

    const UserManagement = new UserDataStore();
    const privileges = UserManagement.getLocalUser.privileges;

    return (
        <div id="privileges-page-wrapper">
            <CreateUserPanel privileges={privileges} />
        </div>
    );
}

export default UserPrivilegesPage;