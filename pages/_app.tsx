import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { SessionProvider } from 'next-auth/react';

import { useDarkMode } from '../lib/useDarkMode';
import { lightTheme, darkTheme, GlobalStyle } from '../theme/themes';
import Header from '../components/Header/Header';
import { UserContextProvider } from '../context/userContext';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;
	return (
		<UserContextProvider>
			<ThemeProvider theme={themeMode}>
				<GlobalStyle />
				<SessionProvider session={session}>
					<Header theme={theme} toggleTheme={toggleTheme} />
					<Component {...pageProps} />
				</SessionProvider>
			</ThemeProvider>
		</UserContextProvider>
	);
}
