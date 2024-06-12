export type Menu = {
    options: Array<MenuItem>
}

export type MenuItem = {
    text: string,
    action: CallableFunction,
    isLoginRequired?: boolean
}