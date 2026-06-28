import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Youtube } from "lucide-react";

import { getMovie, imageUrl } from "@/lib/tmdb";
import { Button } from "@/components/ui/button";
import { SaveMovieButton } from "@/components/save-movie-button";

export default async function FilmePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);

  if (!movie) {
    notFound();
  }

  const backdrop = imageUrl(movie.backdrop_path, "original");
  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${movie.title} Trailer`,
  )}`;

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{movie.title}</h1>

      {backdrop ? (
        <div className="relative aspect-video overflow-hidden rounded-xl border border-border/60">
          <Image
            src={backdrop}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Star className="size-4 fill-yellow-500 text-yellow-500" />
        <span>Avaliação: {movie.vote_average.toFixed(1)} / 10</span>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Sinopse</h2>
        <p className="leading-relaxed text-muted-foreground">
          {movie.overview || "Sinopse não disponível."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <SaveMovieButton
          movie={{
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
          }}
        />
        <Button asChild variant="secondary">
          <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
            <Youtube />
            Trailer
          </a>
        </Button>
      </div>
    </article>
  );
}
