import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
