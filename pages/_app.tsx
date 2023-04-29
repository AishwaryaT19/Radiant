import "../styles/styles.scss";
import type { AppProps } from "next/app";
import AC from "@/provider/app-context";
import Header from "@/components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AC>
      <Header />
      <Component {...pageProps} />
    </AC>
  );
}
