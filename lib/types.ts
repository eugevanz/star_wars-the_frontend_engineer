export interface IHistContext {
  searchHistory: Array<string>;
  updateHistory: (search: string) => void;
}

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: Array<string>;
  release_date: string;
  characters: Array<string>;
}

export interface Data {
  count: number;
  next: string;
  previous: string;
  results: Array<Film>;
}

export type Params = {
  params: {
    episode_id: string;
  };
};

export interface IFormValues {
  search: string;
}
