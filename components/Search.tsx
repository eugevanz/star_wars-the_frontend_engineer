import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import HistContext from "../context/historyContext";

interface IFormValues {
  search: string;
}

export default function Search() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const { searchHistory, updateHistory } = useContext(HistContext);

  const onSubmit: SubmitHandler<IFormValues> = ({ search }) => {
    updateHistory(search);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Search.." {...register("search")} />
        <button type="submit">Search</button>
      </form>

      {searchHistory?.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
