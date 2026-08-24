import { CardSkeletonGrid } from "@/components/PageSkeletons";

/**
 * Next.js App Router loading UI — card skeleton grid during route transitions.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <CardSkeletonGrid count={6} variant="media" />
      </div>
    </div>
  );
}
