import { Skeleton } from "@/components/ui/skeleton";

export default function FilmeLoading() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <Skeleton className="h-9 w-2/3" />

      <Skeleton className="aspect-video w-full rounded-xl" />

      <Skeleton className="h-4 w-44" />

      <div className="space-y-2">
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-9 w-36 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>
    </article>
  );
}
