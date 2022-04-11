import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: Array<string>;
  release_date: string;
  characters: Array<string>;
}

interface Data {
  count: number;
  next: string;
  previous: string;
  results: Array<Film>;
}

type Params = {
  params: {
    id: number;
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: Params) => {
  const res = await fetch(`https://swapi.dev/api/films/${params?.id}`);
  const film: Film = await res.json();

  if (!film) return { notFound: true };

  return {
    props: { film }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  return {
    paths: data.results.map((film) => ({ params: { id: film.episode_id } })),
    fallback: true
  };
};

export default () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Film: {id}</p>;
};
