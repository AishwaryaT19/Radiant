import "../styles/styles.scss";
import { useRef } from "react";
import type { AppProps } from "next/app";
import Header from "@/components/header";
import Login from "@/components/login";
import AC from "@/provider/app-context";

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
