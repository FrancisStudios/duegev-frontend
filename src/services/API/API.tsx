/**
 * ====== Interface Layer  =======
 * Please do not access /API/...(.tsx)
 * files directly. Please use this class
 * as the MIF. =()= gracias uwu
 */

export class API {
    private static instance: API;

    constructor() { }

    public static getInstance() {
        return this.instance
            ? this.instance
            : new API();
    }
}