export class AuthenticationAPI {
    private static instance: AuthenticationAPI;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new AuthenticationAPI();
    }
}