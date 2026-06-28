import { movieSchema, type Movie } from "@/types/movie";

const STORAGE_KEY = "@primeFlix";
const EMPTY: Movie[] = [];

let cache: Movie[] | null = null;
const listeners = new Set<() => void>();

function read(): Movie[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const result = movieSchema.array().safeParse(parsed);
    return result.success ? result.data : EMPTY;
  } catch {
    return EMPTY;
  }
}

function persist(movies: Movie[]): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  cache = movies;
  for (const listener of listeners) listener();
}

/**
 * Snapshot estável dos favoritos (para useSyncExternalStore).
 * Retorna sempre a mesma referência enquanto a lista não muda.
 */
export function getFavorites(): Movie[] {
  if (cache === null) cache = read();
  return cache;
}

/** Snapshot no servidor: nunca há favoritos durante o SSR. */
export function getServerFavorites(): Movie[] {
  return EMPTY;
}

/** Assina mudanças (inclusive de outras abas via evento `storage`). */
export function subscribeFavorites(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = read();
      for (const l of listeners) l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Adiciona um filme aos favoritos. Retorna false se já existir. */
export function addFavorite(movie: Movie): boolean {
  const favorites = getFavorites();
  if (favorites.some((item) => item.id === movie.id)) {
    return false;
  }
  persist([...favorites, movie]);
  return true;
}

/** Remove um filme dos favoritos. */
export function removeFavorite(id: number): void {
  persist(getFavorites().filter((item) => item.id !== id));
}
