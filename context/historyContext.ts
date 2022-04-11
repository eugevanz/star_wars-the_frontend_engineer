import { createContext } from "react";

export interface IHistContext {
  searchHistory: Array<string>;
  updateHistory: (search:string) => void
}

const HistContext = createContext<IHistContext>({
  searchHistory: [],
  updateHistory: () => null
});
export default HistContext;
