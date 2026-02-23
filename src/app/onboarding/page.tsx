import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Figured",
  description: "Get started with Figured",
};

const STEPS = [
  {
    step: 1,
    title: "Check in with your body",
    description:
      "Tap the areas that feel tight, sore, or restricted using our interactive body map.",
  },
  {
    step: 2,
    title: "Describe your symptoms",
    description:
      "Tell us what each area feels like so we can recommend the right exercises.",
  },
  {
    step: 3,
    title: "Get your routine",
    description:
      "Receive a personalized routine built around how you feel — not a generic plan.",
  },
];

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen flex-col px-4 pt-16 pb-12 max-w-md mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">Figured</h1>
        <p className="text-muted-foreground text-base">
          Exercise routines that adapt to how your body feels — every day.
        </p>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        {STEPS.map(({ step, title, description }) => (
          <div key={step} className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              {step}
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-base">{title}</h2>
              <p className="text-muted-foreground text-sm mt-1">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 mt-12">
        <a
          href="/home"
          className="w-full rounded-2xl bg-primary p-4 text-center text-primary-foreground font-semibold text-base"
        >
          Get Started
        </a>
        <a
          href="/home"
          className="w-full rounded-2xl border border-border p-4 text-center text-foreground font-medium text-base"
        >
          Sign In
        </a>
      </div>
    </main>
  );
}
