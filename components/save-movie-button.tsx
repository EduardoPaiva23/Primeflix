"use client";

import { Bookmark } from "lucide-react";
import { toast } from "sonner";

import { addFavorite } from "@/lib/favorites";
import type { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";

export function SaveMovieButton({ movie }: { movie: Movie }) {
  function handleSave() {
    const saved = addFavorite(movie);
    if (saved) {
      toast.success("Filme salvo nos favoritos");
    } else {
      toast.warning("Esse filme já está nos favoritos");
    }
  }

  return (
    <Button onClick={handleSave}>
      <Bookmark />
      Salvar
    </Button>
  );
}
