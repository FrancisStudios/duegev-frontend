import './style/home.page.css';
import './style/main.css';
import HomePage from './page/home.page';
import getCustomTheme from './util/theme.util';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './component/navigation-bar/navigation-bar.component';
import RoutingService from './services/custom-routing.service';
import LoginPage from './page/login.page';
import PAGES from './enum/valid-page-locations.enum';
import CreatePage from './page/creator.page';
import MapPage from './page/map.page';
import UserSettingsPage from './page/settings.page';

function App() {
  const page: PAGES = RoutingService.getURLPath()[0] as PAGES;

  /**
   * Bootstrapping Custom Defined
   * theme w/mui
   *  */
  const customTheme = getCustomTheme();

  /**
   * View Bootstrap Page Selection
   * only page selection template
   * allowed!
   */
  const getPage = (page: PAGES) => {
    switch (page) {
      case PAGES.HOME:
        return <HomePage></HomePage>;
      case PAGES.LOGIN:
        return <LoginPage></LoginPage>;
      case PAGES.CREATE:
        return <CreatePage></CreatePage>;
      case PAGES.MAP:
        return <MapPage></MapPage>
      case PAGES.SETTINGS:
        return <UserSettingsPage></UserSettingsPage>

      default:
        return <HomePage></HomePage>;
    }
  }

  /**
   * Page in Custom Theme Provider
   * so we can have nice things
   */
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <NavigationBar></NavigationBar>
      <div id="content_conftainer">
        {getPage(page)}
      </div>
    </ThemeProvider>
  )
}

export default App;
