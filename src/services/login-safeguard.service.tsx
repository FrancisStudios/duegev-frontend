import { UserData } from "../type/user-data.type";

export class LoginSafeguard {
    public static isLoggedIn() {
        /**
         * Check sessionStorage item 'user' and if it matches UserData && has an auth token
         * then OK -> user is logged in!
         */
    }

    public static enable() {
        /**
         * This should redirect to an error
         * page if the user is not logged in
         * 
         * should be called on top of page components
         * 
         * Or maybe not... We could do something like this
         * in the components
         * 
         * LoginSG.isLoggedin():boolean
         *  ? render(<NormalRender/>)
         *  : LoginSG.safeGuardPage()
         * 
         * or something...
         * */
    }
}