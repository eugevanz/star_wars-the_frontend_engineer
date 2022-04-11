import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import HistContext, { useHistContextValue } from "../context/historyContext";
import Search from "../components/Search";

export interface Data {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    title: string;
    episode_id: number;
    opening_crawl: string;
    director: string;
    producer: Array<string>;
    release_date: string;
    characters: Array<string>;
  }>;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  if (!data) return { notFound: true };

  return {
    props: { data }
  };
};

function HistProvider() {
  const histContextValue = useHistContextValue();

  return (
    <HistContext.Provider value={histContextValue}>
      <Search />
    </HistContext.Provider>
  );
}

export default ({ data }: { data: Data }) => {
  const { push } = useRouter();

  return (
    <div>
      <HistProvider />
      <ul>
        {data.results.map((item) => (
          <li key={item.episode_id}>
            <button onClick={() => push(`/films/${item.episode_id}`)}>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
