"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function RemoveFavoriteButton({
  id,
  onRemove,
}: {
  id: number;
  onRemove: (id: number) => void;
}) {
  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => onRemove(id)}
      aria-label="Excluir dos favoritos"
    >
      <Trash2 />
      Excluir
    </Button>
  );
}
