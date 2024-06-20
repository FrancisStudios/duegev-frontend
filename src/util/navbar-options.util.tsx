import PAGES from "../enum/valid-page-locations.enum"
import { Menu } from "../type/menu-item.type"

const NavbarDefaultMenu: Menu = {
    options: [
        {
            text: 'HOME',
            action: PAGES.HOME
        },
        {
            text: 'SEARCH',
            action: PAGES.HOME,
        },
        {
            text: 'MAP',
            action: PAGES.MAP,
        }
    ]
}

const NavbarUserMenu: Menu = {
    options: [
        {
            text: 'LOGIN',
            isLoginRequired: false,
            action: PAGES.LOGIN,
        },
        {
            text: 'LOGOUT',
            isLoginRequired: true,
            action: PAGES.HOME,
        },
        {
            text: 'CREATE',
            isLoginRequired: true,
            action: PAGES.CREATE,
        },
        {
            text: 'ARTICLES',
            isLoginRequired: true,
            action: PAGES.HOME,
        },
        {
            text: 'SETTINGS',
            isLoginRequired: true,
            action: PAGES.SETTINGS,
        },
        {
            text: 'PRIVILEGES',
            isLoginRequired: true,
            action: PAGES.HOME,
        }
    ]
}

export {
    NavbarDefaultMenu,
    NavbarUserMenu
}