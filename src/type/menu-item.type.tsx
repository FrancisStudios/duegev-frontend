import PAGES from "../enum/valid-page-locations.enum"

export type Menu = {
    options: Array<MenuItem>
}

export type MenuItem = {
    text: string,
    action: PAGES,
    isLoginRequired?: boolean
}