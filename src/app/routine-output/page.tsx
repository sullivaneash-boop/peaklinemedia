import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Routine | Figured",
  description: "Your personalized exercise routine",
};

export default function RoutineOutputPage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-8 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <a href="/symptom-select" className="text-muted-foreground text-sm mb-4 block">
          ← Back
        </a>
        <h1 className="text-2xl font-bold text-foreground">Your Routine</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Personalized based on how you feel today.
        </p>
      </header>

      <section className="flex flex-col gap-4 flex-1">
        {/* Routine summary card */}
        <div className="rounded-2xl bg-accent p-4">
          <p className="text-accent-foreground text-sm font-medium">
            Today&apos;s focus: Lower Back + Hamstrings
          </p>
          <p className="text-muted-foreground text-xs mt-1">6 exercises • ~18 min</p>
        </div>

        {/* Exercise list placeholder */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <a
              key={i}
              href={`/exercise-detail?id=${i}`}
              className="flex items-center gap-4 rounded-2xl bg-card border border-border p-4"
            >
              <div className="w-14 h-14 rounded-xl bg-muted flex-shrink-0" />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-card-foreground text-base">Exercise {i}</p>
                <p className="text-muted-foreground text-xs">3 sets · 30 sec each</p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <button className="w-full rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base">
            Start Routine
          </button>
        </div>
      </section>
    </main>
  );
}
