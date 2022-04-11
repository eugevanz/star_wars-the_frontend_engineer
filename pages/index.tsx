import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import {Data}from'../lib/types'

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
    <>
      {data.results.map((item) => (
        <button
          key={item.episode_id}
          style={{ padding: 12, borderRadius: 12, borderWidth: 0 }}
          onClick={() => push(`/films/${item.episode_id}`)}>
          <span
            style={{
              fontWeight: "bold",
              fontSize: 14
            }}>
            {item.title}
          </span>
        </button>
      ))}
    </>
  );
};
