import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppContextProvider } from '@zeply/ui/context';
import { createEmotionCache } from '@zeply/util';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';
import theme from '../src/theme';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(`http://localhost:4200${input}`, init).then((res) => res.json());
const provider = () => new Map();

export default function App(props: MyAppProps) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				<SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
					<SWRConfig value={{ fetcher, provider }}>
						<AppContextProvider>
							<Component {...pageProps} />
						</AppContextProvider>
					</SWRConfig>
				</SnackbarProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
