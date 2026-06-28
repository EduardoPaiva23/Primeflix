import { z } from "zod";

/** Resumo de um filme (listas: now playing, busca, favoritos). */
export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable().optional(),
  backdrop_path: z.string().nullable().optional(),
  overview: z.string().optional(),
  vote_average: z.number().optional(),
});

export type Movie = z.infer<typeof movieSchema>;

/** Detalhes completos de um filme (rota /filme/[id]). */
export const movieDetailsSchema = movieSchema.extend({
  overview: z.string(),
  vote_average: z.number(),
  release_date: z.string().optional(),
  genres: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .optional(),
});

export type MovieDetails = z.infer<typeof movieDetailsSchema>;

/** Resposta paginada de listas do TMDB. */
export const movieListSchema = z.object({
  page: z.number(),
  results: z.array(movieSchema),
  total_pages: z.number().optional(),
  total_results: z.number().optional(),
});

/** Schema do formulário de busca (React Hook Form + Zod). */
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, "Digite o nome de um filme")
    .max(100, "Busca muito longa"),
});

export type SearchValues = z.infer<typeof searchSchema>;
