import './style/home.page.css';
import './style/main.css';
import HomePage from './page/home.page';
import getCustomTheme from './util/theme.util';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './component/navigation-bar/navigation-bar.component';
import LoginPage from './page/login.page';
import PAGES from './enum/valid-page-locations.enum';
import CreatePage from './page/creator.page';
import MapPage from './page/map.page';
import UserSettingsPage from './page/settings.page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserDataStore } from './store/user-data.store';
import UserPrivilegesPage from './page/privileges.page';
import React from 'react';

function App() {
  const customTheme = getCustomTheme();
  const UserManagement = UserDataStore.getInstance();

  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(UserManagement.isLoggedIn);

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <CssBaseline />
        <NavigationBar></NavigationBar>
        <div id="content_conftainer">
          <Routes>
            <Route path={PAGES.HOME} element={<HomePage />} />
            <Route path={PAGES.LOGIN} element={<LoginPage isLoginSuccessful={() => { setIsLoggedIn(UserManagement.isLoggedIn) }} />} />
            <Route path={PAGES.MAP} element={<MapPage />} />
            <Route path={PAGES.CREATE} element={isLoggedIn ? <CreatePage /> : <HomePage />} />
            <Route path={PAGES.SETTINGS} element={isLoggedIn ? <UserSettingsPage /> : <HomePage />} />
            <Route path={PAGES.PRIVILEGES} element={isLoggedIn ? <UserPrivilegesPage /> : <HomePage />} />
            <Route path='*' element={<HomePage />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}


export default App;
