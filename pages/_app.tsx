import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { Session } from 'next-auth';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';

import { useDarkMode } from '../lib/useDarkMode';
import { UserContextProvider } from '../context/userContext';

import Header from '../components/Header/Header';
import { lightTheme, darkTheme, GlobalStyle } from '../theme/themes';

export default function App({
	Component,
	pageProps,
}: AppProps<{
	session: Session;
}>) {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;
	return (
		<Provider session={pageProps.session}>
			<ThemeProvider theme={themeMode}>
				<GlobalStyle />
				<UserContextProvider>
					<Header theme={theme} toggleTheme={toggleTheme} />
					<Component {...pageProps} />
				</UserContextProvider>
			</ThemeProvider>
		</Provider>
	);
}