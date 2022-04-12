import type { AppProps } from "next/app";
import HistContext, { useHistContextValue } from "../lib/historyContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  const histContextValue = useHistContextValue();

  return (
    <HistContext.Provider value={histContextValue}>
      <Component {...pageProps} />
    </HistContext.Provider>
  );
}
