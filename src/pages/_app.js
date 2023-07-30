import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    // If you pass the session page prop to the <SessionProvider> –
    //  you can avoid checking the session twice on pages that support both server and client side rendering.
    // see: https://next-auth.js.org/getting-started/client#sessionprovider
    <SessionProvider session={session}>
      <RecoilRoot>
        {/* 
        * If your Next.js app uses a class to style the page based on the theme,
      change the attribute prop to class
        * in tailwind.config.js, we set dark
      mode of 'class' */}
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      </RecoilRoot>
      
    </SessionProvider>
  );
}
