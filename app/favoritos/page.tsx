"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  getFavorites,
  getServerFavorites,
  removeFavorite,
  subscribeFavorites,
} from "@/lib/favorites";
import { imageUrl } from "@/lib/tmdb";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RemoveFavoriteButton } from "@/components/remove-favorite-button";

export default function FavoritosPage() {
  const movies = useSyncExternalStore(
    subscribeFavorites,
    getFavorites,
    getServerFavorites,
  );

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Meus favoritos</h1>

      {movies.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-10 text-center">
          <p className="text-muted-foreground">
            Você ainda não salvou nenhum filme.
          </p>
          <Button asChild variant="secondary">
            <Link href="/">Ver filmes em cartaz</Link>
          </Button>
        </Card>
      ) : (
        <ul className="space-y-3">
          {movies.map((movie) => {
            const poster = imageUrl(movie.poster_path, "w500");
            return (
              <li key={movie.id}>
                <Card className="flex items-center gap-4 p-3">
                  <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                    {poster ? (
                      <Image
                        src={poster}
                        alt={movie.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <span className="flex-1 font-medium">{movie.title}</span>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="link" size="sm">
                      <Link href={`/filme/${movie.id}`}>Ver detalhes</Link>
                    </Button>
                    <RemoveFavoriteButton
                      id={movie.id}
                      onRemove={removeFavorite}
                    />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
