import { DUEGEV_CONSTANTS } from "../enum/constants.enum";
import { UserAuthenticationResponse, UserData } from "../type/user-data.type";
import { DuegevEncryptor } from "../util/encryptor.util";

export class UserDataStore {
    private userLoginData: UserAuthenticationResponse = ({} as UserAuthenticationResponse);
    private userData: UserData = {} as UserData;
    private isUserLoggedIn: boolean = false;
    private static instance: UserDataStore;


    /* Singleton Pattern Class as Store */
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new UserDataStore();
        return this.instance;
    }

    private getSessionTokenUserKey(playerName: string): string {
        return DuegevEncryptor.SHA512Encrypt(playerName, 'seskeyun');
    }

    loginNewUser(userLoginData: UserAuthenticationResponse) {
        this.userLoginData = userLoginData;
        this.userData = userLoginData.data?.user as UserData;
        this.isUserLoggedIn = true;

        localStorage.setItem(
            this.getSessionTokenUserKey(this.userData.playerName),
            userLoginData.data?.session_token as string
        );

        localStorage.setItem(
            DUEGEV_CONSTANTS.duegevUserItemKey,
            JSON.stringify(this.userData)
        );
    }

    logOutUser() {
        localStorage.clear();
    }

    get getSessionToken(): (string | 'fail') {
        if (this.userData?.playerName) {
            const sessonTokenKey = this.getSessionTokenUserKey(this.userData.playerName);
            const sessionTokenPre: string = localStorage.getItem(sessonTokenKey) as string;

            return sessionTokenPre && sessionTokenPre !== ''
                ? sessionTokenPre
                : DUEGEV_CONSTANTS.fail
        }
        return DUEGEV_CONSTANTS.fail;
    }

    checkIfLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem(DUEGEV_CONSTANTS.duegevUserItemKey) as string);
        if (user?.username && user?.playerName && user?.uid) {
            this.isUserLoggedIn = true;
            this.userData = user;
            return true;
        }
        return false;
    }

    get isLoggedIn(): boolean { return this.isUserLoggedIn ?? false; }
}