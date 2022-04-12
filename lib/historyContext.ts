import { createContext, useState, useCallback, useRef } from "react";
import { IHistContext } from "./types";

const HistContext = createContext<IHistContext>({
  searchHistory: [],
  updateHistory: () => null
});
export default HistContext;

export function useHistContextValue(): IHistContext {
  const [searchHistory, setHistory] = useState<string[]>([]);

  const setHistoryRef = useRef(setHistory);
  const updateHistory = useCallback(
    (search: string) => {
      if (!searchHistory.includes(search))
        setHistoryRef.current([...searchHistory, search]);
    },
    [searchHistory]
  );

  return { searchHistory, updateHistory };
}
