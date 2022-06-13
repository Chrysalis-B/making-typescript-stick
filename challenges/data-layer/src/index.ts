export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]:
  () => DataEntityMap[K][]
} & {
    [K in keyof DataEntityMap as `get${Capitalize<K>}`]:
    (id: DataEntity['id']) => DataEntityMap[K];
  } & {
    [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]:
    () => void;
  } & {
    [K in keyof DataEntityMap as `add${Capitalize<K>}`]:
    (entry: DataEntityMap[K]) => DataEntityMap[K];
  }

function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== 'undefined';
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {}
  }
  getSong(id: DataEntity['id']) {
    const song = this.#data.song.id;
    if (!song) throw new Error(`Song not found with id ${id}`);
    return song;
  }
  getAllSongs() {
    return Object.keys(this.#data.song)
      .map(songKey => this.#data.song[songKey])
      .filter(isDefined); // alt. use non null assertion operator above -> this.#data.song[songKey]!
  }
  addSong(entry: DataEntityMap['song']) {
    this.#data.song[entry.id] = entry;
    return entry;
  }
  clearSongs() {
    this.#data.song = {};
  }
  getMovie(id: DataEntity['id']) {
    const movie = this.#data.movie.id;
    if (!movie) throw new Error(`Movie not found with id ${id}`);
    return movie;
  }
  getAllMovies() {
    return Object.keys(this.#data.movie)
      .map(movieKey => this.#data.movie[movieKey])
      .filter(isDefined); // alt. use non null assertion operator above -> this.#data.movie[movieKey]!
  }
  addMovie(entry: DataEntityMap['movie']) {
    this.#data.movie[entry.id] = entry;
    return entry;
  }
  clearMovies() {
    this.#data.movie = {};
  }
}