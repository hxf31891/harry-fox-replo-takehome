import type { AppProps } from "next/app";
import "./app.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,700&display=swap"
        rel="stylesheet"
      ></link>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
