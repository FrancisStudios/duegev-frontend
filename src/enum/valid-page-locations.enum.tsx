/**
 * Page locations are managed in the main App.tsx file.
 * window.location.pathname is managed in the routing
 * service
 */

enum PAGES {
    HOME = 'home',
    LOGIN = 'login',
    CREATE = 'create',
    MAP = 'map',
    SETTINGS = 'settings',
    PRIVILEGES = 'privileges',
    ARTICLES = 'articles'
}

export default PAGES;