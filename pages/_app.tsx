import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";
import { Bangers, Grandstander } from "@next/font/google";

const bangers = Bangers({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-bangers",
});

const grandstander = Grandstander({
  subsets: ['latin'],
  variable: "--font-grandstander",
});

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
    <style jsx global>{`
        html {
          font-family: ${grandstander.style.fontFamily};
        }
      `}</style>
    <SessionProvider session={session}>
      <RWBProvider>
        <div className={cx(grandstander.variable, bangers.variable)}>
          <Component {...pageProps} />
        </div>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
    </>
  );
}
