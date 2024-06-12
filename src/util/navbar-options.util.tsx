import { LanguageModel } from "../type/language.type"

const NavbarDefaultMenu = {
    options: [
        {
            text: 'HOME',
            action: '',
        },
        {
            text: 'SEARCH',
            action: '',
        },
        {
            text: 'MAP',
            action: '',
        }
    ]
}

const NavbarUserMenu = {
    options: [
        {
            text: 'LOGIN',
            isLoginRequired: false,
            action: '',
        },
        {
            text: 'LOGOUT',
            isLoginRequired: true,
            action: '',
        },
        {
            text: 'CREATE',
            isLoginRequired: true,
            action: '',
        },
        {
            text: 'ARTICLES',
            isLoginRequired: true,
            action: '',
        },
        {
            text: 'SETTINGS',
            isLoginRequired: true,
            action: '',
        },
        {
            text: 'PRIVILEGES',
            isLoginRequired: true,
            action: '',
        }
    ]
}

export {
    NavbarDefaultMenu,
    NavbarUserMenu
}