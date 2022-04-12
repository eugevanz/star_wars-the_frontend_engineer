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
    if (search.length) {
      updateHistory(search);
      setOpen(false);
      push(`/results?search=${search}`);
    }
  };

  const onRecall = (item: string) => {
    setOpen(false);
    push(`/results?search=${item}`);
  };

  return (
    <div>
      <div style={{ display: "flex", padding: 12 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            style={{
              padding: 12,
              borderWidth: 0,
              color: "#010d12",
              fontSize: 14
            }}
            type="text"
            placeholder="Search.."
            {...register("search", {
              onChange: (e) => setCurrent(e.target.value)
            })}
            onFocus={() => setOpen(true)}
          />
        </form>
        {isOpen && (
          <button
            style={{
              fontSize: 24,
              borderWidth: 0,
              backgroundColor: "white",
              color: "#010d12"
            }}
            onClick={() => setOpen(false)}>
            x
          </button>
        )}
      </div>
      {isOpen && (
        <>
          <button
            style={{
              borderWidth: 0,
              borderRadius: 24,
              padding: 8,
              color: "#010d12"
            }}
            onClick={handleSubmit(onSubmit)}>
            {current}
          </button>
          {searchHistory?.map((item) => (
            <button
              style={{
                borderWidth: 0,
                borderRadius: 24,
                padding: 8,
                color: "white",
                backgroundColor: "#010d12"
              }}
              onClick={() => onRecall(item)}
              key={item}>
              {item}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
