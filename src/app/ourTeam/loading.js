import { CardSkeletonGrid } from "@/components/PageSkeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <CardSkeletonGrid
          count={8}
          variant="team"
          cols="grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        />
      </div>
    </div>
  );
}
