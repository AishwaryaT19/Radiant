import "../styles/styles.scss";
import type { AppProps } from "next/app";
import AC from "@/provider/app-context";
import Header from "@/components/header";
import { useRef } from "react";
import Login from "@/components/login";

export default function App({ Component, pageProps }: AppProps) {
  const loginRef = useRef<HTMLDialogElement>(null);
  return (
    <AC>
      <Login ref={loginRef} />
      <Header loginRef={loginRef} />
      <Component {...pageProps} />
    </AC>
  );
}
