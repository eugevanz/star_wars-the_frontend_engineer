import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormValues {
  search: string;
}

export default function Search({
  context
}: {
  searchHistory: string[];
  setHistory: Dispatch<SetStateAction<never[]>>;
}) {
  const { register, handleSubmit } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = ({ search }) => {
    context.setHistory((prev: Array<string>) => [...prev, search]);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Search.." {...register("search")} />
        <button type="submit">Search</button>
      </form>

      {context.searchHistory?.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}
