import { getNowPlaying } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";

export default async function HomePage() {
  let movies: Awaited<ReturnType<typeof getNowPlaying>> = [];
  try {
    movies = await getNowPlaying();
  } catch (error) {
    console.error("Falha ao carregar filmes em cartaz:", error);
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Em cartaz</h1>
        <p className="text-sm text-muted-foreground">
          Os filmes que estão passando agora nos cinemas.
        </p>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          Não foi possível carregar os filmes em cartaz agora. Tente novamente
          mais tarde.
        </p>
      )}
    </section>
  );
}
