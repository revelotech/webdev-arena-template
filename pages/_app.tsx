import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as ToasterSooner } from "@/components/ui/sonner"

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (e.matches) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    });
  }, []);

  return (
    <>
      <Toaster />
      <ToasterSooner />
      <Component {...pageProps} />
    </>
  )
}
