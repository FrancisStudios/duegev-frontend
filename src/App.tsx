import HomePage from './page/home.page';
import './style/home.page.css';
import getCustomTheme from './util/theme.util';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const page = 'home';


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
    }
  }

  /**
   * Page in Custom Theme Provider
   * so we can have nice things
   */
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {getPage(page)}
    </ThemeProvider>
  )
}

export default App;
