import { Provider } from 'jotai';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Slide, ToastContainer } from 'react-toastify';

import 'animate.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/globals.css';
import '@/styles/tooltip.css';
import '@/styles/colors.css';
import '@/styles/animations.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <ThemeProvider enableSystem attribute='class'>
        <ToastContainer transition={Slide} position='top-right' />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
