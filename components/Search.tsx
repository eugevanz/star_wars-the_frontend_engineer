import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import HistContext from "../lib/historyContext";
import { IFormValues, Data } from "../lib/types";

export const getStaticProps = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  if (!data) return { notFound: true };

  return {
    props: { data }
  };
};

export default function Search() {
  const { register, handleSubmit } = useForm<IFormValues>();
  const { searchHistory, updateHistory } = useContext(HistContext);
  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState("");

  const onSubmit: SubmitHandler<IFormValues> = ({ search }) => {
    if (!searchHistory.includes(search)) updateHistory(search);

    setOpen(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Search.."
          {...register("search", {
            onChange: (e) => setCurrent(e.target.value)
          })}
          onFocus={() => setOpen(true)}
        />
      </form>

      {isOpen && (
        <>
          <button onClick={handleSubmit(onSubmit)}>{current}</button>
          {searchHistory?.map((item) => (
            <button key={item}>{item}</button>
          ))}
        </>
      )}
    </div>
  );
}
