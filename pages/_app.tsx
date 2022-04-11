import type { AppProps } from "next/app";
import HistContext, { useHistContextValue } from "../lib/historyContext";
import Search from "../components/Search";

function HistProvider() {
  const histContextValue = useHistContextValue();

  return (
    <HistContext.Provider value={histContextValue}>
      <Search />
    </HistContext.Provider>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HistProvider />
      <Component {...pageProps} />
    </>
  );
}
