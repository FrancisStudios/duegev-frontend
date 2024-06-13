import './style/home.page.css';
import './style/main.css';
import HomePage from './page/home.page';
import getCustomTheme from './util/theme.util';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavigationBar from './component/navigation-bar/navigation-bar.component';
import RoutingService from './services/custom-routing.service';
import LoginPage from './page/login.page';

function App() {
  const page = RoutingService.getURLPath()[0];

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
  const getPage = (page: string) => {
    switch (page) {
      case 'home':
        return <HomePage></HomePage>;
      case 'login':
        return <LoginPage></LoginPage>;
      
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
