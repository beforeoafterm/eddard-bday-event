import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import { Bangers, Dekko } from "@next/font/google";

const bangers = Bangers({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-bangers",
});

const dekko = Dekko({
  subsets: ['latin'],
  weight: '400',
  variable: "--font-dekko",
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
    <style jsx global>{`
        html {
          font-family: ${dekko.style.fontFamily};
        }
      `}</style>
    <SessionProvider session={session}>
      <RWBProvider>
        <div className={cx(dekko.variable, bangers.variable)}>
          <Component {...pageProps} />
        </div>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
    </>
  );
}
