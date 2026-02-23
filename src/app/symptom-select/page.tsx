import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Symptom Select | Figured",
  description: "Describe your symptoms",
};

const SYMPTOMS = [
  "Tight",
  "Sore",
  "Stiff",
  "Weak",
  "Painful",
  "Swollen",
  "Cramping",
  "Numb",
];

export default function SymptomSelectPage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-8 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <a href="/body-map" className="text-muted-foreground text-sm mb-4 block">
          ← Back
        </a>
        <h1 className="text-2xl font-bold text-foreground">What does it feel like?</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Select all that apply for the areas you selected.
        </p>
      </header>

      <section className="flex flex-col gap-6 flex-1">
        <div className="grid grid-cols-2 gap-3">
          {SYMPTOMS.map((symptom) => (
            <button
              key={symptom}
              className="rounded-2xl border border-border bg-card p-4 text-card-foreground font-medium text-base text-left active:bg-accent active:border-primary transition-colors"
            >
              {symptom}
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <a
            href="/routine-output"
            className="w-full block rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base"
          >
            Build My Routine
          </a>
        </div>
      </section>
    </main>
  );
}
