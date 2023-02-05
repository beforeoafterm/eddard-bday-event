import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <div className="flex flex-col">
      <Meta {...meta} />
      <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Precedent logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p className="font-display">It is Kirk&apos;s birthday!</p>
          </Link>
        </div>
      </div>
      <main className="flex flex-grow w-full flex-col items-center justify-center py-32">
        {children}
      </main>
      <div className="absolute bottom-0 w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Made with ❤️ by Mom & Big Bud.
        </p>
      </div>
    </div>
  );
}
