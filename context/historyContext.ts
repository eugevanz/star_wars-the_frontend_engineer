import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface IHistContext {
  searchHistory: Array<string>;
}

const HistContext = createContext<{
  searchHistory: string[];
  setHistory: Dispatch<SetStateAction<never[]>>;
}>({
  searchHistory: [],
  setHistory: (): void => {
    throw new Error("setHistory must be overwritten");
  }
});
export default HistContext;

export const HistProvider = HistContext.Provider;

export function useHistContext() {
  const context = useContext(HistContext);
  if (context === null) {
    throw Error(
      "Search must be used inside of a HistContext, otherwise it will not function correctly."
    );
  }
  return context;
}
