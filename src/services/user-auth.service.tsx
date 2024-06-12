class User {
    private static instance: User;
    public static readonly isLoggedIn: boolean = false;

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