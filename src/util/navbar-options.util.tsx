import PAGES from "../enum/valid-page-locations.enum"
import RoutingService from "../services/custom-routing.service"
import { Menu } from "../type/menu-item.type"

const NavbarDefaultMenu: Menu = {
    options: [
        {
            text: 'HOME',
            action: (e: React.MouseEvent<HTMLInputElement>) => {
                navigate(PAGES.HOME, e);
            },
        },
        {
            text: 'SEARCH',
            action: () => { },
        },
        {
            text: 'MAP',
            action: () => { },
        }
    ]
}

const NavbarUserMenu: Menu = {
    options: [
        {
            text: 'LOGIN',
            isLoginRequired: false,
            action: (e: React.MouseEvent<HTMLInputElement>) => {
                navigate(PAGES.LOGIN, e);
            },
        },
        {
            text: 'LOGOUT',
            isLoginRequired: true,
            action: () => { },
        },
        {
            text: 'CREATE',
            isLoginRequired: true,
            action: (e: React.MouseEvent<HTMLInputElement>) => { 
                navigate(PAGES.CREATE, e);
            },
        },
        {
            text: 'ARTICLES',
            isLoginRequired: true,
            action: () => { },
        },
        {
            text: 'SETTINGS',
            isLoginRequired: true,
            action: () => { },
        },
        {
            text: 'PRIVILEGES',
            isLoginRequired: true,
            action: () => { },
        }
    ]
}

const navigate = (page: PAGES, e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    RoutingService.navigate(page);
}

export {
    NavbarDefaultMenu,
    NavbarUserMenu
}