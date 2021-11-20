import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { ThemeProvider } from 'styled-components'

import { useDarkMode } from '../lib/useDarkMode';

import Header from '../components/Header/Header'
import { lightTheme, darkTheme, GlobalStyle } from '../theme/themes';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  const [ theme, toggleTheme ] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <Provider session={session}>
      <ThemeProvider theme={themeMode}>
      <GlobalStyle />
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}
export default MyApp
