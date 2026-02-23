import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exercise Detail | Figured",
};

export default function ExerciseDetailPage() {
  return (
    <main className="flex min-h-screen flex-col pb-24 max-w-md mx-auto">
      {/* Hero media area */}
      <div className="w-full aspect-video bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Exercise video / GIF</p>
      </div>

      <div className="flex flex-col gap-5 px-4 pt-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Exercise Name</h1>
            <p className="text-muted-foreground text-sm mt-1">Lower Back · Stretching</p>
          </div>
          <button className="rounded-full bg-muted p-2">
            <span className="sr-only">Save exercise</span>
            {/* Bookmark icon placeholder */}
            <div className="w-5 h-5" />
          </button>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          {["3 sets", "30 sec", "Beginner"].map((stat) => (
            <span
              key={stat}
              className="rounded-full bg-accent text-accent-foreground text-xs font-medium px-3 py-1"
            >
              {stat}
            </span>
          ))}
        </div>

        {/* Instructions */}
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-foreground text-base">How to do it</h2>
          <ol className="flex flex-col gap-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>Start in a neutral standing position with feet hip-width apart.</li>
            <li>Slowly lower into position, keeping your spine neutral.</li>
            <li>Hold for the prescribed duration, then release.</li>
          </ol>
        </div>

        <button className="w-full rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base mt-2">
          Add to Routine
        </button>
      </div>
    </main>
  );
}
