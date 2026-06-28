import { searchMovies } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";

export default async function BuscaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const movies = query ? await searchMovies(query) : [];

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">
          {query ? `Resultados para "${query}"` : "Buscar filmes"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {query
            ? `${movies.length} resultado(s) encontrado(s).`
            : "Use a barra de busca acima para encontrar filmes."}
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : query ? (
        <p className="text-muted-foreground">
          Nenhum filme encontrado. Tente outro termo.
        </p>
      ) : null}
    </section>
  );
}
