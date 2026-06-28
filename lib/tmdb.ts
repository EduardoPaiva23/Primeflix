import {
  movieDetailsSchema,
  movieListSchema,
  type Movie,
  type MovieDetails,
} from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

function getApiKey(): string {
  const key = process.env.TMDB_API_KEY;
  if (!key) {
    throw new Error(
      "TMDB_API_KEY não definida. Copie .env.example para .env.local.",
    );
  }
  return key;
}

/** Monta a URL de imagem do TMDB para um dado tamanho. */
export function imageUrl(
  path: string | null | undefined,
  size: "w500" | "original" = "w500",
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE}/${size}${path}`;
}

type TmdbParams = Record<string, string | number>;

async function tmdbFetch(
  path: string,
  params: TmdbParams = {},
): Promise<unknown> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "pt-BR");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!response.ok) {
    throw new Error(`TMDB ${path} respondeu ${response.status}`);
  }
  return response.json();
}

/** Filmes em cartaz (home). */
export async function getNowPlaying(): Promise<Movie[]> {
  const data = await tmdbFetch("/movie/now_playing", { page: 1 });
  return movieListSchema.parse(data).results;
}

/** Detalhes de um filme. Retorna null se não existir. */
export async function getMovie(id: string): Promise<MovieDetails | null> {
  try {
    const data = await tmdbFetch(`/movie/${id}`);
    return movieDetailsSchema.parse(data);
  } catch {
    return null;
  }
}

/** Busca filmes por termo. */
export async function searchMovies(query: string): Promise<Movie[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];
  const data = await tmdbFetch("/search/movie", { query: trimmed, page: 1 });
  return movieListSchema.parse(data).results;
}
