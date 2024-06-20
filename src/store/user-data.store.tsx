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
    }

    get isLoggedIn(): boolean { 
        //console.log(this.isLoggedIn ?? false);
        console.log(this.userData)
        return this.isUserLoggedIn ?? false; 
    }
}