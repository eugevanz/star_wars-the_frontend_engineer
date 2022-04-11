import Link from "next/link";
import { GetServerSideProps } from "next";
import HistContext, { IHistContext } from "../context/historyContext";
import Search from "../components/Search";
import { useState } from "react";

interface Data {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string;
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
  }[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  if (!data) return { notFound: true };

  return {
    props: { data }
  };
};

function HistProvider() {
  const [searchHistory, setHistory] = useState([]);

  return (
    <HistContext.Provider value={{ searchHistory, setHistory }}>
      <Search context={{ searchHistory, setHistory }} />
    </HistContext.Provider>
  );
}

export default ({ data }: { data: Data[] }) => {
  return (
    <div>
      <HistProvider />
      Hello World. {JSON.stringify(data)}
      <Link href="/about">
        <a href="/about">About</a>
      </Link>
    </div>
  );
};
