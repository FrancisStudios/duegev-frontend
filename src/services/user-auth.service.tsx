/**
 * Local user management. Everything
 * related to logged in user control.
 */
class User {
    private static instance: User;
    public static readonly isLoggedIn: boolean = true;

    private constructor() { }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new User();
        return this.instance;
    }
}

export default User;