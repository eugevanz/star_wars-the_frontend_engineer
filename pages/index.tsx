import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Data } from "../lib/types";
import Search from "../components/Search";

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  if (!data) return { notFound: true };

  return {
    props: { data }
  };
};

export default ({ data }: { data: Data }) => {
  const { push } = useRouter();

  return (
    <div>
      <Search />
      {data?.results.map((item) => (
        <button
          key={item.episode_id}
          style={{
            padding: 24,
            paddingRight: 64,
            borderRadius: 8,
            borderWidth: 0,
            textAlign: "left",
            marginTop: 12,
            backgroundColor: "#010d12"
          }}
          onClick={() => push(`/films/${item.episode_id}`)}>
          <div style={{ color: "#4b7e94" }}>{item.release_date}</div>
          <div
            style={{
              fontWeight: "bold",
              fontSize: 24,
              color: "#F0F8FF"
            }}>
            {item.title}
          </div>
          <div style={{ paddingTop: 8, color: "#F0F8FF" }}>
            {item.opening_crawl}
          </div>
        </button>
      ))}
    </div>
  );
};
