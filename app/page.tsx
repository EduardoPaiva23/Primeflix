import { getNowPlaying } from "@/lib/tmdb";
import { MovieCard } from "@/components/movie-card";

export default async function HomePage() {
  const movies = await getNowPlaying();

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Em cartaz</h1>
        <p className="text-sm text-muted-foreground">
          Os filmes que estão passando agora nos cinemas.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
