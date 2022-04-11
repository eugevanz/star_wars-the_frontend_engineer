import { createContext, useState, useCallback } from "react";

export interface IHistContext {
  searchHistory: Array<string>;
  updateHistory: (search: string) => void;
}

const HistContext = createContext<IHistContext>({
  searchHistory: [],
  updateHistory: () => null
});
export default HistContext;

export function useHistContextValue(): IHistContext {
  const [searchHistory, setHistory] = useState<string[]>([]);
  const updateHistory = useCallback(
    (search: string) => setHistory([...searchHistory, search]),
    [setHistory, searchHistory]
  );

  return { searchHistory, updateHistory };
}
