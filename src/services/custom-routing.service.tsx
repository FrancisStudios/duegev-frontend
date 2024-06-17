/**
 * Our custom routing service *w* 
 * to be able to fully customize
 * everything... Why don't you use
 * React's routing provider??? Bla
 * bla-bla... This is fully intentional
 * :p 
 */

import PAGES from "../enum/valid-page-locations.enum";


class RoutingService {
    private static instance: RoutingService;

    private constructor() { }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new RoutingService();
        return this.instance;
    }

    public static getURLPath(): Array<string> {
        const path = window.location.pathname
        const route = path.split('/');
        return route.filter(r => r !== '');
    }

    public static getURLParams(): string {
        const params = window.location.search;
        return params;
    }

    public static navigate(page: PAGES) {
        window.location.pathname = `/${page}`;
    }
}

export default RoutingService;