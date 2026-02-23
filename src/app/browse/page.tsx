import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse | Figured",
  description: "Browse all exercises",
};

const CATEGORIES = ["All", "Stretching", "Strength", "Mobility", "Recovery"];

export default function BrowsePage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-8 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Browse</h1>
        <p className="text-muted-foreground mt-1 text-sm">Explore exercises by category</p>
      </header>

      {/* Search */}
      <div className="relative mb-5">
        <input
          type="search"
          placeholder="Search exercises..."
          className="w-full rounded-xl bg-muted border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="flex-shrink-0 rounded-full border border-border bg-card text-card-foreground text-sm font-medium px-4 py-2 active:bg-accent active:border-primary transition-colors"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exercise grid */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <a
            key={i}
            href={`/exercise-detail?id=${i + 1}`}
            className="flex flex-col gap-2 rounded-2xl bg-card border border-border overflow-hidden"
          >
            <div className="w-full aspect-square bg-muted" />
            <div className="px-3 pb-3">
              <p className="font-semibold text-card-foreground text-sm">Exercise {i + 1}</p>
              <p className="text-muted-foreground text-xs">Stretching</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
