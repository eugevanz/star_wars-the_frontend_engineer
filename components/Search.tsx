import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import HistContext from "../lib/historyContext";
import { IFormValues } from "../lib/types";

export default function Search() {
  const { push } = useRouter();

  const { register, handleSubmit } = useForm<IFormValues>();

  const { searchHistory, updateHistory } = useContext(HistContext);

  const [isOpen, setOpen] = useState(false);
  const [current, setCurrent] = useState("");

  const onSubmit: SubmitHandler<IFormValues> = ({ search }) => {
    updateHistory(search);
    setOpen(false);
    push(`/results?search=${search}`);
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
        <button onClick={() => setOpen(false)}>cancel</button>
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
