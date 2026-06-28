"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";

import { searchSchema, type SearchValues } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  function onSubmit({ query }: SearchValues) {
    router.push(`/busca?q=${encodeURIComponent(query)}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-sm items-center gap-2"
    >
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Buscar filmes..."
          aria-label="Buscar filmes"
          aria-invalid={Boolean(errors.query)}
          {...register("query")}
        />
        {errors.query ? (
          <p className="mt-1 text-xs text-destructive">
            {errors.query.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" size="icon" aria-label="Buscar">
        <Search />
      </Button>
    </form>
  );
}
