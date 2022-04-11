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
    episode_id: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const res = await fetch(`https://swapi.dev/api/films/${params?.episode_id}`);
  const film: Film = await res.json();

  if (!film) return { notFound: true };

  return {
    props: { film }
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://swapi.dev/api/films");
  const data: Data = await res.json();

  return {
    paths: data.results.map((film) => ({
      params: { episode_id: `${film.episode_id}` }
    })),
    fallback: true
  };
};

export default ({ film }: { film: Film }) => {
  return (
    <div>
      <h1>{film.title}</h1>
      <p>Episode: {film.episode_id}</p>
    </div>
  );
};
