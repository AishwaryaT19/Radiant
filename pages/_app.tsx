import "../styles/styles.scss";
import { useRef } from "react";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import Navigation from "@/components/navigation";
import AC from "@/provider/app-context";

export default function App({ Component, pageProps }: AppProps) {
  const loginRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDialogElement>(null);
  return (
    <AC>
      <Login ref={loginRef} />
      <Header loginRef={loginRef} navRef={navRef} />
      <Component {...pageProps} />
      <Footer />
      <Navigation ref={navRef} />
    </AC>
  );
}
