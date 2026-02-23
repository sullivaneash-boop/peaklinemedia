import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Body Map | Figured",
  description: "Select the areas of your body that need attention",
};

export default function BodyMapPage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-8 pb-24 max-w-md mx-auto">
      <header className="mb-6">
        <a href="/home" className="text-muted-foreground text-sm mb-4 block">
          ← Back
        </a>
        <h1 className="text-2xl font-bold text-foreground">Where does it hurt?</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tap the areas of your body that feel tight, sore, or restricted.
        </p>
      </header>

      {/* Body map SVG placeholder */}
      <section className="flex flex-col items-center flex-1 gap-6">
        <div className="w-full aspect-[9/16] max-h-[60vh] rounded-2xl bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Body map SVG goes here</p>
        </div>

        <a
          href="/symptom-select"
          className="w-full rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base"
        >
          Continue
        </a>
      </section>
    </main>
  );
}
