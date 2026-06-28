import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { imageUrl } from "@/lib/tmdb";
import type { Movie } from "@/types/movie";
import { Card } from "@/components/ui/card";

export function MovieCard({ movie }: { movie: Movie }) {
  const poster = imageUrl(movie.poster_path, "w500");

  return (
    <Link href={`/filme/${movie.id}`} className="group">
      <Card className="overflow-hidden border-border/60 transition-transform duration-200 group-hover:-translate-y-1 group-hover:border-primary/60">
        <div className="relative aspect-[2/3] bg-muted">
          {poster ? (
            <Image
              src={poster}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center text-sm text-muted-foreground">
              {movie.title}
            </div>
          )}
        </div>
        <div className="space-y-1 p-3">
          <h3 className="line-clamp-1 text-sm font-medium" title={movie.title}>
            {movie.title}
          </h3>
          {typeof movie.vote_average === "number" ? (
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="size-3 fill-yellow-500 text-yellow-500" />
              {movie.vote_average.toFixed(1)}
            </p>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}
