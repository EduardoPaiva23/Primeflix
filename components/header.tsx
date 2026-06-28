import Link from "next/link";
import { Clapperboard, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <Clapperboard className="size-6 text-primary" />
          <span>
            Prime<span className="text-primary">Flix</span>
          </span>
        </Link>

        <div className="order-last w-full sm:order-none sm:w-auto sm:flex-1 sm:max-w-sm sm:px-6">
          <SearchBar />
        </div>

        <Button asChild variant="secondary" size="sm">
          <Link href="/favoritos">
            <Heart className="size-4" />
            Meus favoritos
          </Link>
        </Button>
      </div>
    </header>
  );
}
