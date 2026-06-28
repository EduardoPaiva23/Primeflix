import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <h2 className="text-xl font-semibold">Página não encontrada!</h2>
      <Button asChild>
        <Link href="/">Veja todos os filmes</Link>
      </Button>
    </div>
  );
}
