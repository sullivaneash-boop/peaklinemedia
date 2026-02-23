import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Figured",
};

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-8 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1 text-sm">Track your progress</p>
      </header>

      <section className="flex flex-col gap-4">
        {/* Streak card */}
        <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm font-medium opacity-80">Current Streak</p>
          <p className="text-5xl font-bold mt-1">7</p>
          <p className="text-sm opacity-80 mt-1">days in a row</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-muted-foreground text-xs">Routines done</p>
            <p className="text-2xl font-bold text-card-foreground mt-1">24</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4">
            <p className="text-muted-foreground text-xs">Exercises saved</p>
            <p className="text-2xl font-bold text-card-foreground mt-1">12</p>
          </div>
        </div>

        {/* Recent activity */}
        <div className="flex flex-col gap-3 mt-2">
          <h2 className="font-semibold text-foreground text-base">Recent Routines</h2>
          {["Yesterday", "2 days ago", "4 days ago"].map((date) => (
            <div
              key={date}
              className="flex items-center justify-between rounded-2xl bg-card border border-border p-4"
            >
              <div>
                <p className="font-medium text-card-foreground text-sm">Lower Back Focus</p>
                <p className="text-muted-foreground text-xs mt-0.5">{date} · 6 exercises</p>
              </div>
              <span className="text-xs text-primary font-medium">View</span>
            </div>
          ))}
        </div>

        <div className="mt-2">
          <a
            href="/body-map"
            className="w-full block rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base"
          >
            Start Today&apos;s Routine
          </a>
        </div>
      </section>
    </main>
  );
}
