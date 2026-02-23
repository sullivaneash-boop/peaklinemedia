import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Figured",
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-12 pb-24 max-w-md mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Figured</h1>
        <p className="text-muted-foreground mt-1">How does your body feel today?</p>
      </header>

      <section className="flex flex-col gap-4">
        <a
          href="/body-map"
          className="w-full rounded-2xl bg-primary p-5 text-primary-foreground font-semibold text-lg shadow-sm active:scale-95 transition-transform"
        >
          Start Body Check-In
        </a>
        <a
          href="/dashboard"
          className="w-full rounded-2xl bg-card border border-border p-5 text-card-foreground font-medium text-base"
        >
          My Dashboard
        </a>
        <a
          href="/browse"
          className="w-full rounded-2xl bg-card border border-border p-5 text-card-foreground font-medium text-base"
        >
          Browse Exercises
        </a>
      </section>
    </main>
  );
}
