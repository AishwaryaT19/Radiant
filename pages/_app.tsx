import "../styles/styles.scss";
import { useRef, useEffect } from "react";
import type { AppProps } from "next/app";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Login from "@/components/login";
import Navigation from "@/components/navigation";
import { useSetLoginModal } from "@/hooks/use-login-modal";
import AC from "@/provider/app-context";

export default function App({ Component, pageProps }: AppProps) {
  const loginRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDialogElement>(null);
  const setLoginModal = useSetLoginModal();
  useEffect(() => {
    setLoginModal(loginRef);
  });
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
